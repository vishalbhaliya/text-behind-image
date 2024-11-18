import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import { ImageIcon, LucideHome } from "lucide-react";
import { UserMenu } from "./user-menu";

export function NavBar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-screen-xl mx-auto">
        <div className="flex items-center mr-8">
          <ImageIcon className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">Retouch Image</span>
        </div>
        
        <NavigationMenu className="flex-1 flex justify-center">
          <NavigationMenuList className="flex gap-6 items-center">
            <NavigationMenuItem>
              <Link
                to="/"
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                <LucideHome className="mr-2 h-4 w-4" />
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to="/text-behind-image"
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                Text Behind Image
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/image-editor"
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                Image Editor
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to="/about"
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                About
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}