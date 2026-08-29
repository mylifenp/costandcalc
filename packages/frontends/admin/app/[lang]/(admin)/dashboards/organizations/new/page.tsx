'use client';

import React from 'react';
import { AddOrganizationInput } from '@/graphql/generated/types.generated';
import { CREATE_ORGANIZATION } from '@/graphql/mutations/organization';
import { useMutation } from '@apollo/client/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { PageTitle } from '@/components/PageTitle';

const NewOrganizationPage = () => {
  const router = useRouter();
  const [createOrganization, { loading }] = useMutation(CREATE_ORGANIZATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddOrganizationInput>({ defaultValues: { enabled: true } });

  const onSubmit: SubmitHandler<AddOrganizationInput> = async (data) => {
    try {
      await createOrganization({ variables: { input: data } });
      router.push('/dashboards/organizations');
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/dashboards/organizations');
    }
  };

  return (
    <div>
      <PageTitle
        title="Create Organization"
        items={[
          { label: 'Dashboards' },
          { label: 'Organizations', path: '/dashboards/organizations' },
          { label: 'Create', active: true },
        ]}
      />

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Go back"
                  title="Go back"
                  className="btn btn-ghost border-base-300 btn-sm btn-square"
                >
                  <span className="iconify lucide--chevron-left size-4" />
                </button>

                <div>
                  <h1 className="text-2xl font-semibold">New Organization</h1>
                  <p className="text-sm text-base-content/60">Create a new organization</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text">Organization Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="My Organization"
                      className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                      {...register('name', { required: true })}
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && <p className="text-sm text-error mt-1">Name is required</p>}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Alias</span>
                    </label>
                    <input
                      type="text"
                      placeholder="my-awesome-page"
                      className={`input input-bordered w-full ${errors.alias ? 'input-error' : ''}`}
                      {...register('alias', { required: true })}
                      aria-invalid={errors.alias ? 'true' : 'false'}
                    />
                    {errors.alias && <p className="text-sm text-error mt-1">Alias is required</p>}
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="checkbox checkbox-primary" {...register('enabled')} />
                      <span className="label-text">Enabled</span>
                    </label>
                  </div>

                  <div />

                  <div className="md:col-span-2">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full h-28"
                      placeholder="Describe the organization"
                      {...register('description')}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button type="button" onClick={handleBack} className="btn btn-ghost">
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <span className="loading loading-spinner" /> : 'Add Organization'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrganizationPage;
