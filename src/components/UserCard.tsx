import Image from "next/image"


function UserCard({type}:{type:string}) {
  return (
    <div className="rounded-2xl p-4 odd:bg-lamaPurple even:bg-lamaYellow flex-1">
      <div className=" flex justify-between items-center gap-2">
      <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/25</span>
      <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">1,234</h1>
      <h1 className="capitalize text-sm font-medium text-gray-500 ">{type}</h1>
    </div>
  )
}

export default UserCard