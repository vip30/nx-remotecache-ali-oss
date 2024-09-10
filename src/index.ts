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
  filePrefix: string;
}

const runner = createCustomRunner<OssRunnerOptions>(
  async (options): Promise<RemoteCacheImplementation> => {
    initEnv(options);

    const client = new OSS({
      region: process.env.NXCACHE_ALI_OSS_REGION ?? options.region,
      accessKeyId:
        process.env.NXCACHE_ALI_OSS_ACCESS_KEY ?? options.accessKeyId,
      accessKeySecret:
        process.env.NXCACHE_ALI_OSS_ACCESS_KEY_SECRET ??
        options.accessKeySecret,
      bucket: process.env.NXCACHE_ALI_OSS_BUCKET ?? options.bucket,
    });

    const getFilename = (filename: string) => {
      const filePrefix =
        process.env.NXCACHE_ALI_OSS_FILE_PREFIX ?? options.filePrefix;

      if (!filePrefix) return filename;
      return `${filePrefix}/${filename}`;
    };

    return {
      name: "Ali Object Storage",
      fileExists: async (filename) => {
        try {
          const result = await client.head(getFilename(filename));
          return !!result;
        } catch (_) {
          return false;
        }
      },
      retrieveFile: async (filename) => {
        const response = await client.getStream(getFilename(filename));
        return response.stream;
      },
      storeFile: (filename, stream) =>
        client.put(getFilename(filename), stream),
    };
  },
);

export default runner;
