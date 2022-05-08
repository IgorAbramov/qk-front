import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { UploadStatus } from "@prisma/client";
import {UploadSucceededEvent, UploadFailedEvent, UploadApprovedEvent, UploadRejectedEvent} from "../event";

const fs = require('fs')
/**
 * Handles all events regarding Mass-uploads functionality
 */
@Injectable()
export class UploadEventListener {
  constructor(
      private eventEmitter: EventEmitter2,
  ) {
  }

  @OnEvent("upload.failed")
  handleUploadFailedEvent(event: UploadFailedEvent): void {
    console.log(event);

    // remove file
    try {
      fs.unlinkSync(`./uploads/${event.filename}`)
    } catch(err) {
      console.error(err)
    }
  }

  @OnEvent("upload.succeeded")
  handleUploadSucceededEvent(event: UploadSucceededEvent): void {
    console.log(event);

    // send notifications to institution representatives
    // skip this part and change status right away
    const upload = event.upload;
    upload.status = UploadStatus.APPROVED;

    const uploadApprovedEvent = new UploadApprovedEvent();
    uploadApprovedEvent.upload = event.upload;
    this.eventEmitter.emit("upload.approved", uploadApprovedEvent);
  }

  @OnEvent("upload.approved")
  handleUploadApprovedEvent(event: UploadApprovedEvent): void {
    console.log(event);

    // load file

    // get the extension, check if it is supported

    // parse depending on the extension

    // foreach entry create CredentialsCreateMessage with data from entry

    // dispatch CredentialsCreateMessage to queue https://github.com/bbc/sqs-producer
    // sqs queue url: https://sqs.eu-north-1.amazonaws.com/594068861847/CreateCredentialsQueue.fifo

    // remove file
    try {
      fs.unlinkSync(`./uploads/${event.upload.file_url}`)
    } catch(err) {
      console.error(err)
    }
  }

  @OnEvent("upload.rejected")
  handleUploadRejectedEvent(event: UploadRejectedEvent): void {
    console.log(event);

    // remove file
    try {
      fs.unlinkSync(`./uploads/${event.upload}`)
    } catch(err) {
      console.error(err)
    }
  }
}