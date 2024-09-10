# nx-remotecache-ali-oss

This is a remote caching solution for [@nrwl/nx](https://nx.dev/react) using AliCloud Object Storage.

## Description

This package allows all team members and CI servers to share a single cache, improving build times and reducing resource usage. It is built with [nx-remotecache-custom](https://www.npmjs.com/package/nx-remotecache-custom).

## Compatibility

This package is compatible with Nx versions 16.9.0 and above.

## Setup

Install the package as a dev dependency:

```sh
npm install --save-dev nx-remotecache-ali-oss
```

## Configuration

You can configure the package using environment variables or the `nx.json` file. Here are the available options:

| Parameter         | Description                                                             |  Environment Variable / .env        | `nx.json`         |
| ----------------- | ----------------------------------------------------------------------- | ----------------------------------- | ----------------- |
| Access Key        | Connect to an AliCloud Object Storage blob via a single URL.            | `NXCACHE_ALI_OSS_ACCESS_KEY`        | `accessKeyId`     |
| Access Secret Key | Use together with Account Key for AliCloud Credentials Authentication   | `NXCACHE_ALI_OSS_ACCESS_KEY_SECRET` | `accessKeySecret` |
| Bucket            | Required. Specify which container should be used for storing the cache. | `NXCACHE_ALI_OSS_BUCKET`            | `bucket`          |
| Region            | Optional. Specify the location of the storage e.g. "us-west-1".         | `NXCACHE_ALI_OSS_REGION`            | `region`          |
| FilePrefix        | Optional. Adding file prefix before the filename.                       | `NXCACHE_ALI_OSS_FILE_PREFIX`       | `filePrefix`      |

## Usage

You can use this package as the default task runner in your `nx.json` file:

```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx-remotecache-ali-oss",
      "options": {
        "accessKeyId": "your-access-key",
        "accessKeySecret": "your-secret-key",
        "bucket": "your-bucket",
        "region": "your-region", // optional
        "filePrefix": "cache", // optional
        "cacheableOperations": ["build", "test", "lint", "e2e"]
      }
    }
  }
}
```
