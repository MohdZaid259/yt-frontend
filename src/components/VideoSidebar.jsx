export default function Sidebar() {
  return (
    <aside className="space-y-6">
      <div className="flex text-sm gap-2 overflow-x-auto pb-2">
        <div className={`flex px-2 py-1 items-center justify-start rounded-lg cursor-pointer bg-white text-black`}>All</div>
        <div className={`flex px-2 py-1 items-center justify-start rounded-lg cursor-pointer bg-zinc-800`}>From the series</div>
        <div className={`flex px-2 py-1 items-center justify-start rounded-lg cursor-pointer bg-zinc-800`}>From Khayal e Yaar</div>
      </div>
      <div className="space-y-4">
        <h2 className="font-semibold text-xl">Shorts</h2>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-[9/16] rounded-lg bg-muted" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="w-40 aspect-video rounded bg-muted flex-shrink-0" />
            <div>
              <h3 className="font-medium line-clamp-2">Video Title</h3>
              <p className="text-sm text-muted-foreground">Channel Name</p>
              <p className="text-sm text-muted-foreground">123K views • 2 years ago</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
