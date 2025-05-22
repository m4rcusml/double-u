import { ChevronRight } from "lucide-react";

type Props = {
  title: string;
  icon: React.ReactNode;
  description?: string;
  onClick: () => void;
}

export function SettingButton({
  title,
  icon,
  description,
  onClick
}: Props) {
  return <button onClick={onClick} className='flex items-center justify-between gap-4 px-4'>
    <div className='flex items-center gap-4'>
      {icon}

      <div className='flex flex-col gap-1'>
        <span className='font-semibold text-left'>{title}</span>
        {description && <p className='text-muted-foreground text-sm text-left'>{description}</p>}
      </div>
    </div>

    <ChevronRight size={24} />
  </button>;
}