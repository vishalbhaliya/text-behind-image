'use client'

import * as React from 'react'
import { Link } from 'react-router-dom'
import { ImageIcon, Menu } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { Button } from '../button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../sheet'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '../navigation-menu'
import { UserMenu } from './user-menu'

const navItems = [
  { title: 'Home', path: '/' },
  { title: 'Text Behind Image', path: '/text-behind-image' },
  { title: 'About', path: '/about' },
]

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-screen-xl mx-auto">
        <div className="flex items-center mr-4 md:mr-8">
          <ImageIcon className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">Redesign Image</span>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6 items-center">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    )}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto flex items-center">
          <UserMenu />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center rounded-md px-2 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}