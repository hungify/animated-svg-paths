import { createFileRoute } from '@tanstack/react-router'
import ReactLogo from '~/assets/greeting.svg?raw'
import AnimatedSvgPaths from '~/components/animated-svg-path'

function Home() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <AnimatedSvgPaths svgSource={ReactLogo} />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})
