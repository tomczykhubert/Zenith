"use client";
import SignUp from "@/components/auth/signUp";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";
import { useDictionary } from "@/providers/dictionaryProvider";
import React from "react";

const SignupPage = () => {
  const { t } = useDictionary();
  const breadcrumbItems = [
    {
      label: t("user.signUp"),
    },
  ];
  return (
    <>
      <PageBreadcrumb items={breadcrumbItems} />
      <div className="flex justify-center">
        <SignUp />
      </div>
    </>
  );
};

export default SignupPage;
