import UserCart from "@/components/UserCard"


function AdminPage() {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
{/* LEFT */}
<div className=" flex gap-4 justify-between flex-wrap ">
<UserCart type="student"/>
<UserCart type="teacher"/>
<UserCart type="parent"/>
<UserCart type="staff"/>
</div>
{/* RIGHT */}
<div className="w-full lg:w-1/3 ">right</div>
    </div>
  )
}

export default AdminPage