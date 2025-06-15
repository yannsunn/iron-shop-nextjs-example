const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-iron-light">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-solid border-iron-dark border-r-transparent mb-4"></div>
        <p className="text-iron-dark text-lg font-medium">読み込み中...</p>
      </div>
    </div>
  )
}

export default Loading