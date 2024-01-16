import { join } from 'path';
import { EggAppConfig, PowerPartial } from 'egg';
import { patchAjv } from 'cnpmcore/port/typebox';
import { SyncDeleteMode, SyncMode, ChangesStreamMode } from 'cnpmcore/common/constants';

// import S3Client from 's3-cnpmcore';

export default (appInfo: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.middleware = [ 'errorHandle' ];
  // override config from framework / plugin
  config.keys = appInfo.name + '1705401057860';

  config.cnpmcore = {
    name: 'cnpmcore',
    hooksLimit: 20,
    sourceRegistry: 'https://registry.npmmirror.com',
    // upstream registry is base on `cnpmcore` or not
    // if your upstream is official npm registry, please turn it off
    sourceRegistryIsCNpm: true,
    syncUpstreamFirst: false,
    // 3 mins
    sourceRegistrySyncTimeout: 180000,
    taskQueueHighWaterSize: 100,
    // sync mode
    //  - none: don't sync npm package, just redirect it to sourceRegistry
    //  - all: sync all npm packages
    //  - exist: only sync exist packages, effected when `enableCheckRecentlyUpdated` or `enableChangesStream` is enabled
    syncMode: SyncMode.admin,
    syncDeleteMode: SyncDeleteMode.delete,
    hookEnable: false,
    syncPackageWorkerMaxConcurrentTasks: 10,
    triggerHookWorkerMaxConcurrentTasks: 10,
    createTriggerHookWorkerMaxConcurrentTasks: 10,
    // stop syncing these packages in future
    syncPackageBlockList: [],
    // check recently from https://www.npmjs.com/browse/updated, if use set changesStreamRegistry to cnpmcore,
    // maybe you should disable it
    enableCheckRecentlyUpdated: true,
    // mirror binary, default is false
    enableSyncBinary: false,
    // cnpmcore api: https://r.cnpmjs.org/-/binary
    syncBinaryFromAPISource: '',
    // enable sync downloads data from source registry https://github.com/cnpm/cnpmcore/issues/108
    // all three parameters must be configured at the same time to take effect
    enableSyncDownloadData: false,
    syncDownloadDataSourceRegistry: '',
    syncDownloadDataMaxDate: '', // should be YYYY-MM-DD format
    // https://github.com/npm/registry-follower-tutorial
    enableChangesStream: false,
    checkChangesStreamInterval: 500,
    changesStreamRegistry: 'https://replicate.npmjs.com',
    // handle _changes request mode, default is 'streaming', please set it to 'json' when on cnpmcore registry
    changesStreamRegistryMode: ChangesStreamMode.streaming,
    registry: process.env.CNPMCORE_CONFIG_REGISTRY || 'http://localhost:7001',
    // https://docs.npmjs.com/cli/v6/using-npm/config#always-auth npm <= 6
    // if `alwaysAuth=true`, all api request required access token
    alwaysAuth: false,
    // white scope list
    allowScopes: [
      '@my',
    ],
    // allow publish non-scope package, disable by default
    allowPublishNonScopePackage: false,
    // Public registration is allowed, otherwise only admins can login
    allowPublicRegistration: true,
    // default system admins
    admins: {
      // name: email
      nxps: 'nxps22@gmail.com',
    },
    // http response cache control header
    enableCDN: false,
    // if you are using CDN, can set it to 'max-age=0, s-maxage=120, must-revalidate'
    // it meaning cache 10s on CDN server and no cache on client side.
    cdnCacheControlHeader: 'max-age=0, s-maxage=120, must-revalidate',
    // if you are using CDN, can set it to 'Accept, Accept-Encoding'
    cdnVaryHeader: 'Accept, Accept-Encoding',
    // store full package version manifests data to database table(package_version_manifests), default is false
    enableStoreFullPackageVersionManifestsToDatabase: false,
    // only support npm as client and npm >= 7.0.0 allow publish action
    enableNpmClientAndVersionCheck: true,
    // sync when package not found, only effect when syncMode = all/exist
    syncNotFound: false,
    // redirect to source registry when package not found, only effect when syncMode = all/exist
    redirectNotFound: true,
    enableUnpkg: true,
    strictSyncSpecivicVersion: false,
  };

  // override config from framework / plugin
  config.dataDir = join(appInfo.root, '.cnpmcore');

  config.customLogger = {
    sqlLogger: {
      file: 'sql.log',
    },
  };
  config.orm = {
    client: 'mysql',
    database: 'cnpmcore',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    charset: 'utf8mb4',
    logger: {},
  };

  if (process.env.DEBUG_LOCAL_SQL) {
    config.orm.logger = {
      // TODO: try to save SQL log into ctx logger or app logger
      logQuery(sql: string, duration: number) {
        console.log('[sql-debug] [%sms] %s', duration, sql);
      },
    };
  }

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    // allow all domains
    origin: (ctx): string => {
      return ctx.get('Origin');
    },
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  config.nfs = {
    client: null,
    dir: join(config.dataDir, 'nfs'),
  };

  config.logger = {
    enablePerformanceTimer: true,
    enableFastContextLogger: true,
  };

  config.logrotator = {
    // only keep 1 days log files
    maxDays: 1,
  };

  config.bodyParser = {
    // saveTag will send version string in JSON format
    strict: false,
    // set default limit to 10mb, see https://github.com/npm/npm/issues/12750
    jsonLimit: '10mb',
  };

  // https://github.com/xiekw2010/egg-typebox-validate#%E5%A6%82%E4%BD%95%E5%86%99%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99
  config.typeboxValidate = { patchAjv };

  config.httpclient = {
    useHttpClientNext: true,
  };

  return config;

};
