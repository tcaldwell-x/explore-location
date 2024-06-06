import Avatar from '@mui/material/Avatar';

export const User = (props: any) => {
  return (
    <div className="flex flex-row hover:bg-[#ffffff0d] justify-items items-center p-4 m-1 border rounded-md border-gray-700">
        <Avatar alt={props.user.name} src={props.user.profile_image_url} />
        <div className="flex flex-col mx-3">
            <div className="flex flex-row items-center">
                <div className="text-md text-white font-bold hover:underline cursor-pointer max-w-36 truncate text-ellipsis">{props.user.name}</div>
                <div className="w-[18px] h-[18px] max-w-[18px] max-h-[18px] mx-1">{props.user.verified ? <svg viewBox="0 0 24 24" aria-label="Verified account" role="img"><g><path fill="white" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>: ''}</div>
            </div>
            <div className="text-sm text-gray-400">@{props.user.username}</div>
        </div>
    </div>
  );
}