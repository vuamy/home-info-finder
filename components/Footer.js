export default function Footer() {
    return (
        <footer className="bg-primary py-2">
            <div>
                <div className="flex justify-between mx-8 text-white">
                <div className="text-sm text-zinc-700 font-semibold py-1 text-center md:text-left">
                    Copyright © {new Date().getFullYear()}{" "}
                </div>
                <a
                    href="https://github.com/vuamy"
                    className="text-zinc-700 hover:text-blueGray-500 text-sm font-semibold block py-1 px-3">
                    Amy Vu
                </a>
                </div>
            </div>
        </footer>
    );
}