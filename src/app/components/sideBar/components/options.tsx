import { signOut } from "next-auth/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LogOut, MoreVertical } from "lucide-react";

export default function Options() {
  return (
    <div>
      <Menu>
        <MenuButton className="p-2 rounded-full hover:bg-gray-800 text-white">
          <MoreVertical size={20} />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-black drop-shadow-md p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 flex justify-between hover:cursor-pointer"
              onClick={() => signOut()}
            >
              Sair
              <LogOut size={20} />
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
