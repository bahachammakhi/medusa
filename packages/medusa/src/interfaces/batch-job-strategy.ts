import { AdminPostBatchesReq } from "../api/routes/admin/batch/create-batch-job"
import { TransactionBaseService } from "./transaction-base-service"

export interface IBatchJobStrategy<T extends TransactionBaseService<any>>
  extends TransactionBaseService<T> {
  /**
   * Method for preparing a batch job for processing
   */
  prepareBatchJobForProcessing(
    batchJobEntity: object,
    req: Express.Request
  ): Promise<object>

  /**
   * Method for pre-processing a batch job
   */
  preProcessBatchJob(batchJobId: string): Promise<void>

  /**
   *  Method does the actual processing of the job. Should report back on the progress of the operation.
   */
  processJob(batchJobId: string): Promise<void>

  /**
   * Builds and returns a template file that can be downloaded and filled in
   */
  buildTemplate()
}

export abstract class AbstractBatchJobStrategy<
    T extends TransactionBaseService<any>
  >
  extends TransactionBaseService<T>
  implements IBatchJobStrategy<T>
{
  static identifier: string
  static batchType: string

  async prepareBatchJobForProcessing(
    batchJob: AdminPostBatchesReq,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Express.Request
  ): Promise<AdminPostBatchesReq> {
    return batchJob
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async preProcessBatchJob(batchJobId: string): Promise<void> {
    return
  }

  public abstract processJob(batchJobId: string): Promise<void>

  public abstract buildTemplate(): Promise<string>
}

export function isBatchJobStrategy(
  object: unknown
): object is IBatchJobStrategy<any> {
  return object instanceof AbstractBatchJobStrategy
}
