import { z } from "zod";

export const FetchResponseSchema = z.object({
  success: z.boolean(),
  instances: z.object({
    currentPage: z.number(),
    totalCount: z.number(),
    totalPages: z.number(),
    results: z.array(
      z.object({
        amiId: z.string(),
        createdAt: z.string().datetime(),
        instanceName: z.string(),
        instanceType: z.string(),
        ipAddress: z.object({
          publicIP: z.string(),
          privateIP: z.string(),
          _id: z.string(),
        }).optional(),
        isDeleted: z.boolean(),
        resourceId: z.string(),
        status: z.string(),
        tags: z.array(z.record(z.string(), z.string())).optional(), // Assuming each tag is an object with a key-value pair
        terraformResourceName: z.string(),
        updatedAt: z.string().datetime(),
        userId: z.string(),
        __v: z.number(),
        _id: z.string(),
      })
    ),
  }),
});
