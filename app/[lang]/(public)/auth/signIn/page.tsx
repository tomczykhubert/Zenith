"use client";
import SignIn from "@/components/auth/signIn";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";
import { useDictionary } from "@/providers/dictionaryProvider";
import React from "react";

const SignInPage = () => {
  const { t } = useDictionary();
  const breadcrumbItems = [
    {
      label: t("user.signIn"),
    },
  ];
  return (
    <>
      <PageBreadcrumb items={breadcrumbItems} />
      <div className="flex justify-center">
        <SignIn />
      </div>
    </>
  );
};

export default SignInPage;
