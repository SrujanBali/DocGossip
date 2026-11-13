import os
import jwt
from jwt import PyJWKClient
from functools import wraps
from flask import jsonify, request, g
from dotenv import load_dotenv

load_dotenv()

AUTH_DOMAIN = os.getenv("AUTH0_DOMAIN")
AUTH_AUDIENCE = os.getenv("AUTH0_AUDIENCE")
JWKS_URL = f"https://{AUTH_DOMAIN}/.well-known/jwks.json"

jwks_client = PyJWKClient(JWKS_URL)

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or invalid token format"}), 401

        token = auth_header.split(" ")[1]
        try:
            signing_key = jwks_client.get_signing_key_from_jwt(token)
            payload = jwt.decode(
                token, signing_key, algorithms=["RS256"],
                audience=AUTH_AUDIENCE,
                issuer=f"https://{AUTH_DOMAIN}/"
            )
            g.auth0_id = payload["sub"]
        except Exception as e:
            return jsonify({"error": "Unauthorized", "details": str(e)}), 401

        return f(*args, **kwargs)
    return decorated