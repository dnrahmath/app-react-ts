// import ApplicationLogo from '../Components/ApplicationLogo';
// import { Link } from '@inertiajs/react';
import { Link } from "react-router-dom";
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link to="/">
                    {/* <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" /> */}
                    <img 
                        src="https://o2.funjourney.co.id/assets/images/sites/FJ_logo.png" 
                        alt="Fun Journey Logo"
                        className="h-20 w-20"
                    />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
