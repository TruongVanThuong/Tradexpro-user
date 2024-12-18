import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
const profileTabs = [
  {
    name: "My Profile",
    url: `/user/profile`,
  },
  {
    name: "Edit Profile",
    url: `/user/edit-profile`,
  },
  {
    name: "Phone Verification",
    url: `/user/phone-verification`,
  },
  {
    name: "Security",
    url: `/user/security`,
  },
  {
    name: "KYC Verification",
    url: `/user/personal-verification`,
  },
  {
    name: "Bank List",
    url: `/user/bank/list`,
  },
  {
    name: "Change Password",
    url: `/user/change-password`,
  },
];
export default function UserProfileSidebar({
  photo,
  first_name,
  last_name,
  email,
  showUserInfo = false,
}: any) {
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <div className=" tradex-h-fit tradex-bg-background-main tradex-rounded-lg tradex-border tradex-border-background-primary tradex-shadow-[2px_2px_23px_0px_#6C6C6C0D] tradex-px-4 tradex-pt-12 tradex-pb-6 tradex-space-y-8">
      {showUserInfo && (
        <div className=" tradex-flex tradex-flex-col tradex-justify-center tradex-items-center tradex-gap-6 ">
          <div className=" tradex-min-w-[140px] tradex-relative">
            <img
              src={photo}
              className=" tradex-max-w-[140px] tradex-max-h-[140px] tradex-object-cover tradex-object-center tradex-rounded-full tradex-border-solid tradex-border-[3px] tradex-border-primary"
              alt=""
            />
            <img
              className=" tradex-absolute tradex-right-0 tradex-bottom-[15px]"
              src="/active_user_icon.png"
              alt=""
            />
          </div>
          <div className=" tradex-space-y-1 tradex-text-center">
            <h3 className=" tradex-text-[32px] !tradex-text-title tradex-leading-[38px] tradex-font-bold">
              {first_name + " " + last_name}
            </h3>
            <p className=" tradex-text-xl !tradex-text-title tradex-leading-6">
              {email}
            </p>
          </div>
        </div>
      )}
      <div className=" tradex-space-y-4">
        {profileTabs.map((profileTab: any, index: number) => (
          <Link href={profileTab?.url} key={index}>
            <a
              className={` tradex-inline-block tradex-w-full tradex-py-3 tradex-px-2.5 tradex-rounded tradex-bg-background-primary !tradex-text-title tradex-text-xl tradex-leading-6 ${
                router.pathname == profileTab?.url &&
                "tradex-bg-primary !tradex-text-white"
              }`}
            >
              {t(profileTab?.name)}
            </a>
          </Link>
        ))}

        <Link href={`/support`}>
          <a
            className={` tradex-inline-block tradex-w-full tradex-py-3 tradex-px-2.5 tradex-rounded tradex-bg-background-primary tradex-text-title tradex-text-xl tradex-leading-6`}
          >
            {t(`Support`)}
          </a>
        </Link>
      </div>
    </div>
  );
}
