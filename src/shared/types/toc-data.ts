export interface IPage {
  id: string;
  title: string;
  parentId?: string;
  level: number;
  tabIndex: number;
  pages?: string[];
  url?: string;
  doNotShowWarningLink?: boolean;
}

export interface IEntities {
  pages: Record<string, IPage>;
}

export interface ITOCData {
  entities: IEntities;
  topLevelIds: string[];
}
