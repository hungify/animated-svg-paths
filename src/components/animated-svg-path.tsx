'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '~/lib/utilities'

type SVGPathAttributes = React.ComponentProps<typeof motion.path>
type SVGAttributes = React.ComponentProps<typeof motion.svg>
type Props = SVGAttributes & {
  svgSource: string
}

const SPEED = 1
export default function AnimatedSvgPath({
  className,
  svgSource,
  ...restProps
}: Props) {
  const [pathAttributes, setPathAttributes] = useState<SVGPathAttributes[]>([])
  const [svgAttributes, setSvgAttributes] = useState<SVGAttributes>()

  useEffect(() => {
    function fetchSVG() {
      try {
        const parser = new DOMParser()
        const svgDocument = parser.parseFromString(svgSource, 'image/svg+xml')
        const pathElements = svgDocument.querySelectorAll('path')
        const svgElement = svgDocument.querySelector('svg')

        if (!svgElement) {
          throw new Error(`SVG element not found`)
        }

        setSvgAttributes({
          viewBox: svgElement.getAttribute('viewBox') || '0 0 1009 200',
          fill: svgElement.getAttribute('fill') || 'none',
          stroke: svgElement.getAttribute('stroke') || 'currentColor',
          strokeWidth: svgElement.getAttribute('stroke-width') || '14.8883',
        })

        // eslint-disable-next-line unicorn/prefer-spread
        const extractedPathsAttributes: SVGPathAttributes[] = Array.from(
          pathElements
        ).map((path) => {
          return {
            d: path.getAttribute('d') || '',
            fill: path.getAttribute('fill') || 'none',
            stroke: path.getAttribute('stroke') || 'currentColor',
            strokeWidth: path.getAttribute('stroke-width') || '14.8883',
          }
        })

        setPathAttributes(extractedPathsAttributes)
      } catch {
        throw new Error(`Unable to parse SVG`)
      }
    }

    fetchSVG()
  }, [svgSource])

  return (
    <motion.svg
      className={cn('h-20', className)}
      xmlns='http://www.w3.org/2000/svg'
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...svgAttributes}
      {...restProps}
    >
      {pathAttributes.map((pathAttribute, index) => (
        <motion.path
          key={index}
          {...pathAttribute}
          initial={{
            strokeLinecap: 'inherit',
            pathLength: 0,
          }}
          animate={{
            strokeLinecap: 'round',
            pathLength: 1,
          }}
          transition={{
            duration: 1 * SPEED,
            ease: 'easeInOut',
            delay: (0.5 + index * 0.5) * SPEED,
          }}
        />
      ))}
    </motion.svg>
  )
}
