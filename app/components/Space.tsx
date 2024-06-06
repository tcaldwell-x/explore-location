import Avatar from '@mui/material/Avatar';

export const Space = (props: any) => {
  return (
    <div className="flex flex-row hover:bg-[#ffffff0d] justify-items items-center p-4 m-1 border rounded-md border-gray-700">
    <div className="flex flex-col mx-3 gap-2">
        <div className="flex flex-row items-center gap-2">
            <a href={`https://x.com/i/spaces/${props.space.id}`} className="text-lg text-white font-bold hover:underline cursor-pointer max-w-lg truncate text-ellipsis">{props.space.title}</a>
        </div>
        {props.space.host && 
        <div className="flex flex-row gap-2 items-center">
            <span className="text-xs text-gray-400">{`Hosted by:`}</span>
            <Avatar sx={{ width: 20, height: 20 }} src={props.space.host.profile_image_url} />
            <a href={`https://twitter.com/${props.space.host.username}`} className="text-xs text-white hover:underline">{`${props.space.host.name}`}</a>
        </div>
        }
        <div className="flex flex-row items-center gap-2">
            <div className="text-[10px] font-bold uppercase border rounded-md border-gray-700 px-2">{props.space.state === 'live' ? `• ${props.space.state}` : props.space.state}</div>
            <div className="text-sm text-white font-bold">{props.space.state === 'live' ? `${props.space.participant_count} listening` : ``}</div>
        </div>
    </div>
    </div>
  );
}