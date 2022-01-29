export interface Build {
  /**
   * The hash of the build
   */
  hash: string;

  /**
   * The time the build was created
   */
  date: string;

  /**
   * The build number
   */
  number: number;

  /**
   * The global environment variables
   */
  GLOBAL_ENV?: { [key: string]: string };

  /**
   * The headers of the build
   */
  headers?: { [key: string]: string[] };

  /**
   * The experiments of the build
   */
  experiments?: Experiment[];

  /**
   * Files in the build
   */
  files?: Files;
}

export enum ExperimentType {
  USER = "USER",
  GUILD = "GUILD",
}

export interface Experiment {
  /**
   * The experiment ID
   */
  id: string;

  /**
   * The experiment type
   */
  type: ExperimentType;

  /**
   * The experiment title
   */
  title: string;

  /**
   * The experiment treatment descriptions
   */
  description: string[];

  /**
   * The experiment treatment buckets
   */
  buckets: number[];

  /**
   * The experiment requirement filters
   */
  clientFilter: string | null;
}

export interface Files {
  /**
   * Scripts in the app HTML
   */
  rootScripts: string[];

  /**
   * Modules loaded in the webpack loader
   */
  modules: string[];

  /**
   * CSS files
   */
  css: string[];

  /**
   * Misc. files
   */
  other: string[];
}
