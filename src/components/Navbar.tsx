import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"


async function Navbar() {
  const user = await currentUser()
  const role = user?.publicMetadata.role as string
  return (
    <div className="flex justify-between gap-6 items-center p-4">
        {/* Search Bar */}
        <div className="hidden md:flex items-center text-xs gap-4 rounded-full ring-[1.5px]  ring-gray-300 px-2">
          <Image src="/search.png" alt="search-icon" width={14} height={14} />
          <input type="text" placeholder="Search... " className="w-[200px] p-2 bg-transparent outline-none" />
        </div>
        {/*Icons and users  */}
        <div className="flex items-center gap-2 w-full justify-end ">
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="" width={20} height={20} />
          </div>

          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex item-center justify-center bg-purple-500 rounded-full text-white text-xs">1</div>
          </div>

          <SignedIn>
            <div className="flex flex-col">
              <span className="text-xs leading-3 font-medium">John Doe</span>
              <span className="text-[10px] text-gray-500 text-right">{role}</span>
            </div>

            <UserButton/>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>


    </div>
  )
}

export default Navbar