import { z } from "zod";

export const FetchResponseSchema = z.object({
  success: z.boolean(),
  message: z.string()
});

export const AMIListResponseSchema = z.object({
  success: z.boolean(),
  response: z.array(z.object({
    _id: z.string(),
    name: z.string(),
    ami: z.string(),
    description: z.string(),
    architecture: z.string(),
    os: z.string(),
    isDeleted: z.boolean(),
    __v: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
  }))
});

export const InstanceTypeResponseSchema = z.object({
  success: z.boolean(),
  response: z.array(z.object({
    _id: z.string(),
    instanceType: z.string(),
    freeTierEligible: z.boolean(),
    cpuInfo: z.object({
      DefaultVCpus: z.number(),
      DefaultCores: z.number(),
      DefaultThreadsPerCore: z.number()
    }),
    memoryInfo: z.object({
      SizeInMiB: z.number()
    }),
    isDeleted: z.boolean(),
    __v: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
  }))
});

export const FetchErrorSchema = z.object({
  success: z.boolean(),
  status: z.number(),
  message: z.string(),
  stack: z.object({})
})