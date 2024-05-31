import OSS from "ali-oss";
import {
  createCustomRunner,
  initEnv,
  RemoteCacheImplementation,
} from "nx-remotecache-custom";

interface OssRunnerOptions {
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
  region: string;
}

const runner = createCustomRunner<OssRunnerOptions>(
  async (options): Promise<RemoteCacheImplementation> => {
    initEnv(options);

    const client = new OSS({
      region: process.env.NXCACHE_ALI_OSS_REGION,
      accessKeyId: process.env.NXCACHE_ALI_OSS_ACCESS_KEY_SECRET ?? "",
      accessKeySecret: process.env.NXCACHE_ALI_OSS_ACCESS_KEY_SECRET ?? "",
      bucket: process.env.NXCACHE_ALI_OSS_BUCKET,
    });

    return {
      name: "Ali Object Storage",
      fileExists: async (filename) => {
        try {
          const result = await client.head(filename);
          return !!result;
        } catch (_) {
          return false;
        }
      },
      retrieveFile: async (filename) => {
        const response = await client.getStream(filename);
        return response.stream;
      },
      storeFile: (filename, stream) => client.put(filename, stream),
    };
  },
);

export default runner;
