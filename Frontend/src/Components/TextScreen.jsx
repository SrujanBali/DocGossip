import "../app.css"

function TextScreen() {
  return (
    <div className="flex-1 flex flex-col h-full bg-amber-50 relative overflow-y-auto px-6">
      <div className="absolute bottom-4 left-6 right-6 flex h-[10%] items-center border-2 bg-[#dfccbf] rounded-2xl p-2">
        <textarea 
          name="text-box" 
          id="text-box" 
          className="flex w-full h-full rounded-2xl text-xl p-2 outline-none resize-none" 
          placeholder="Type your message here..."
        ></textarea>
        <button className="bg-[#5c7f67] text-white rounded-xl px-4 py-2 ml-2 cursor-pointer">Send</button>
      </div>
    </div>
  )
}

export default TextScreen