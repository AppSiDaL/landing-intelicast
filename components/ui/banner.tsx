import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const bannerVariants = cva(
  'flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 border-b',
  {
    variants: {
      variant: {
        info: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/30 dark:text-blue-100 dark:border-blue-800',
        announcement: 'bg-primary/5 text-foreground border-border/60 dark:bg-primary/10',
        promotional: 'bg-white dark:bg-slate-950 border-border text-foreground',
        success: 'bg-green-50 text-green-900 border-green-200 dark:bg-green-950/30 dark:text-green-100 dark:border-green-800',
        warning: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/30 dark:text-amber-100 dark:border-amber-800',
      },
    },
    defaultVariants: {
      variant: 'promotional',
    },
  }
)

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
  onClose?: () => void
  dismissible?: boolean
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant,
      icon,
      title,
      description,
      action,
      onClose,
      dismissible = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="region"
        aria-label="announcement"
        className={cn(
          bannerVariants({ variant }),
          'w-full sticky top-0 z-40 animate-in fade-in duration-300',
          className
        )}
        {...props}
      >
        {/* Icon */}
        {icon && <div className="shrink-0 flex items-center">{icon}</div>}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold text-sm md:text-base leading-tight">
              {title}
            </p>
          )}
          {description && (
            <p className="text-xs md:text-sm opacity-90 mt-0.5">
              {description}
            </p>
          )}
        </div>

        {/* Action */}
        {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}

        {/* Close Button */}
        {dismissible && onClose && (
          <button
            onClick={onClose}
            className="shrink-0 p-1 hover:opacity-70 transition-opacity"
            aria-label="Cerrar anuncio"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Banner.displayName = 'Banner'

export { Banner, bannerVariants }
