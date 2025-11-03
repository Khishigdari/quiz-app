import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between items-center max-w-[1920px] px-6 py-2 fixed z-50 bg-white w-full border border-[#E4E4E7]">
      <Link href={"/"}>
        <h4 className="text-6 font-semibold leading-6">Quiz app</h4>
      </Link>
      <img src={"./user.svg"} />
    </div>
  );
};

export default Header;
