import { socialLoginstyles } from "./classNames";

export interface SocialLoginInfo {
  icon: React.ElementType;
  label: string;
  className: string;
  onClick: () => void;
}
interface SocialLoginButtonsProps {
  socialmediaLinks: SocialLoginInfo[];
}

export const SocialLoginButtons = ({ socialmediaLinks }: SocialLoginButtonsProps) => (
  <div className={socialLoginstyles.socialLoginContainer}>
    {socialmediaLinks.map((item, index) => (
      <button key={index} className={socialLoginstyles.socialLoginButton} onClick={item.onClick}>
        <item.icon size={20} className={item.className} />
        <span className="text-sm">{item.label}</span>
      </button>
    ))}
  </div>
);
