"use client"
import { signOut } from '@/lib/auth-client'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function Logout() {
const router=useRouter()
      const handleLogout=async()=>{
    signOut({
      fetchOptions:{
        
        onSuccess:()=>{
          router.push("/login")
        }
      }
    })
  }
  return (
         <Button onClick={handleLogout}
                className="border-2 border-custom-accent"
                variant={"outline"}
              >
                Signout
              </Button>
  )
}
