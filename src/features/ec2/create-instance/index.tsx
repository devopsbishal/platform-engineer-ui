import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import CustomInput from '@/components/form/CustomInput';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';
import { useAMIList } from './hooks/useAMIList.hook';
import { useCreateInstance } from './hooks/useCreateInstance.hook';
import { useInstanceType } from './hooks/useInstanceType.hook';
import { FormSchema } from './schema/formSchema';
import { AMIList, InstanceType } from './types/IInstanceEnum';
import AMIListSelect from './ui/AMIListSelect';
import InstanceTypeSelect from './ui/InstanceTypeSelect';
import { Tag, Tags } from './ui/Tags';

export default function CreateInstance() {
  const [isLoading, setIsLoading] = useState(false);

  const createInstance = useCreateInstance();

  const {
    data: AMIListData,
    // isLoading: AMIListloading,
    // error: AMIListError,
  } = useAMIList();
  const {
    data: InstanceTypeData,
    // isLoading: InstanceTypeLoading,
    // error: InstanceTypeError,
  } = useInstanceType();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      instanceName: 'ec2-instance-web-10',
      instanceType: InstanceType.T2_MICRO,
      amiId: AMIList.AMAZON_LINUX_2x86_64,
      tags: [],
      numberOfInstance: 1,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    console.log('Creating instances:', data);
    createInstance.mutate(data);

    setTimeout(() => {
      setIsLoading(false);
      
    }, 500);
  };

  return (
    <>
      <Header />
      <Main>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Create a new EC2 Instance
          </h1>
          <Form {...form}>
            <form
              // TODO: take sidenavbar state and in open full in close 50
              className={cn('lg:max-w-[50%] w-full')}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='instanceName'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInput
                          label='Instance Name'
                          labelClassName='font-semibold text-base'
                          type='text'
                          placeholder='ec2-instance-web-1'
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='instanceType'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InstanceTypeSelect
                          instanceType={InstanceTypeData?.response ?? []}
                          placeholder='Select an instance type'
                          label='Instance Type'
                          labelClassName='font-semibold text-base'
                          helpText='Choose the right instance for your project.'
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='amiId'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AMIListSelect
                          amiList={AMIListData?.response ?? []}
                          label='Amazon Machine Image (AMI)'
                          placeholder='Search for an AMI'
                          labelClassName='font-semibold text-base'
                          required
                          helpText='Please select an AMI from the list.'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='numberOfInstance'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInput
                          type='number'
                          label='Number of Instance'
                          labelClassName='font-semibold text-base'
                          required
                          placeholder='Enter number of instances'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='tags'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Tags
                          maxTags={5}
                          {...field}
                          value={field.value.filter(
                            (tag): tag is Tag => tag !== undefined
                          )}
                          onChange={(tags) =>
                            // Filter undefined values before mapping or passing them on:
                            field.onChange(
                              tags
                                .filter((tag): tag is Tag => tag !== undefined)
                                .map((tag) => ({
                                  [Object.keys(tag)[0]]: Object.values(tag)[0],
                                }))
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className='mt-2 max-w-40'
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Instance'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Main>
    </>
  );
}
