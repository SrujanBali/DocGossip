import "../app.css"

function WelcomeModal() {
  return (
    <div className="flex  justify-center w-full h-full items-center">
    <div className="w-[70%] h-[70%] flex flex-col justify-evenly items-center p-2">
        <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-7xl font-roboto-slab">Welcome User</h1>
        <p className="text-2xl">Ask away any questions about your document</p>
        </div>
    </div>
    </div>
  )
}

export default WelcomeModal