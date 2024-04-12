import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between bg-blue-700 font-extrabold px-4">
        <div className="text-2xl  mt-3 flex flex-row italic">
             Pay <div className="text-white ">flex</div>
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}


// user: An optional object which may have a name property of type string or null. This is used to determine if the user is logged in or not. If the user object exists and potentially has a name, we assume the user is logged in.
// onSignin: A function that is supposed to be called when the user wants to log in.
// onSignout: A function that is supposed to be called when the user wants to log out.
{/* <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
If user is truthy (indicating a user is logged in), the button's onClick will be set to onSignout, and its children (the text inside the button) will be "Logout".
If user is falsy (indicating no user is logged in), the button's onClick will be set to onSignin, and its children will be "Login". */}