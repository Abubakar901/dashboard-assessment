import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import SearchInput from "@/components/Navbar/SearchBar";

const Navbar = () => {

  return (
    <nav className="h-11 flex items-center justify-between px-4 md:px-6 xl:px-10 2xl:px-16 bg-white">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-blue-800 font-bold">
              Dashboard V2
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SearchInput />
    </nav>
  );
};

export default Navbar;
