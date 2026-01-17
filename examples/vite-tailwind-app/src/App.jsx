import "shadcn-ui-kit/dist/styles.css"
import { Button } from "shadcn-ui-kit"

export default function App() {
  return (
    <h1 className="text-3xl font-bold underline dark">
      <div className='py-4'>
        <Button onClick={() => { }}>Toggle Dark Mode</Button>
      </div>
      <div className='py-4'>
        <Button variant="destructive" className='text-orange-500' >Shadcn Button</Button>
      </div>
    </h1>
  )
}