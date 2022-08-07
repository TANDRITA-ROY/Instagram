import { getProviders, signIn as signInProvider } from "next-auth/react"
import  Header  from "../../components/Header"
const signIn = ({ providers }) => {
  return (
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center min-h-screen py-2  px-14 text-center">
      <img className="w-80" src="https://links.papareact.com/ocw"/>
      <p className="font-xs italic">This is an Instagram Clone Build!!!</p>
      <div className="mt-40"> 
    {Object.values(providers).map((provider) => (
      <div key={provider.name}>
        <button className="rounded-lg p-3 text-white bg-blue-500" onClick={() => signInProvider(provider.id, {callbackUrl:"/"})}>
          Sign in with {provider.name}
        </button>
        
      </div>
    ))}
    </div>
    </div>
  </>
  )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
      props: { providers },
    }
}
export default signIn
