import { ISizeCalculationResult } from 'image-size/dist/types/interface';
import { ChatType, ElementType } from '../entities';

import * as fileType from 'file-type';
export declare class NTQQFileApi {
    static getFileType(filePath: string): Promise<fileType.FileTypeResult | undefined>;
    static copyFile(filePath: string, destPath: string): Promise<void>;
    static getFileSize(filePath: string): Promise<number>;
    static uploadFile(filePath: string, elementType?: ElementType, elementSubType?: number): Promise<{
        md5: string;
        fileName: string;
        path: string;
        fileSize: number;
        ext: string;
    }>;
    static downloadMedia(msgId: string, chatType: ChatType, peerUid: string, elementId: string, thumbPath: string, sourcePath: string, timeout?: number): Promise<string>;
    static getImageSize(filePath: string): Promise<ISizeCalculationResult | undefined>;
}
