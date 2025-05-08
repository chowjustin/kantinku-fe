"use client";

import Layout from "@/layouts/Layout";

export default function DetailTenantSkeleton() {
  return (
    <Layout withNavbar withFooter={false}>
      <div className="px-8 md:px-16 py-8 md:py-16 space-y-6">
        {/* Tenant Header Skeleton */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-64 h-40 rounded-lg bg-gray-200 animate-pulse" />

          <div className="flex flex-col gap-4 w-full">
            <div className="h-8 w-3/4 md:w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="flex flex-col gap-2 text-md w-fit">
              <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Menu List Skeleton */}
        <div>
          <div className="h-7 w-48 mb-4 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-40 w-full bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
