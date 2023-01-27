import FormData from 'form-data';
import MimeTypes from "mime-types";
import fs from 'fs';
import { ContactInbox, IMessageParam, MessageMedia } from '../interface';
import { Base } from './model';

export class Conversations extends Base<ContactInbox> {
  constructor({
    client,
    accountId
  }) {
    super({ client, path: 'conversations', accountId });
  }

  get(
    inboxId?: string, status?: string, assigneeType?: string, labels?: string[], page: number = 1, teamId?: string
  ) {
    return this.client.get(this.path, {
      params: {
        inbox_id: inboxId,
        team_id: teamId,
        status,
        assignee_type: assigneeType,
        page,
        labels
      }
    });
  }

  search({ q, page }) {
    return this.client.get(`${this.path}/search`, {
      params: { q, page }
    });
  }

  toggleStatus(conversationId: string, status) {
    return this.client.post(`${this.path}/${conversationId}/toggle_status`, {
      status
    });
  }

  assignAgent(conversationId: string, agentId) {
    return this.client.post(
      `${this.path}/${conversationId}/assignments?assignee_id=${agentId}`,
      {}
    );
  }

  assignTeam(conversationId: string, teamId) {
    const params = { team_id: teamId };
    return this.client.post(`${this.path}/${conversationId}/assignments`, params);
  }

  sendMessage(conversationId: string, params: IMessageParam, file: string) {
    if (file) {
      const data = new FormData();
      data.append('content', params.content ? params.content : "");
      data.append('attachments[]', fs.createReadStream(file), {
        filepath: file
      });

      if (params.content_attributes) {
        data.append('content_attributes', params.content_attributes);
      }
      if (params.private) {
        data.append('private', String(params.private));
      }

      data.append('message_type', params.message_type);
      return this.client.post(`${this.path}/${conversationId}/messages`, data, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data.getBoundary()}`
        }
      });
    }
    return this.client.post(`${this.path}/${conversationId}/messages`, params);
  }

  async postChatwootMessage(
    conversationId: string | number,
    message: string,
    type: "outgoing" | "incoming",
    isPrivate = false,
    messagePrefix?: string,
    attachment?: MessageMedia
  ) {

    const bodyFormData: FormData = new FormData();
    if (messagePrefix != null) {
      message = messagePrefix + message;
    }

    bodyFormData.append("content", message);
    bodyFormData.append("message_type", type);
    bodyFormData.append("private", isPrivate.toString());

    if (attachment != null) {
      const buffer = Buffer.from(attachment.data, "base64");
      const extension = MimeTypes.extension(attachment.mimetype);
      const attachmentFilename = attachment.filename ?? "attachment." + extension;
      bodyFormData.append("attachments[]", buffer, attachmentFilename);
    }

    const { data } = <{ data: Record<string, unknown> }>await this.client.post(`${this.path}/${conversationId}/messages`, bodyFormData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${bodyFormData.getBoundary()}`
      }
    });

    return data;
  }

  markMessageRead(conversationId) {
    return this.client.post(`${this.path}/${conversationId}/update_last_seen`);
  }

  toggleTyping(conversationId: string, status = 'on') {
    return this.client.post(`${this.path}/${conversationId}/toggle_typing_status`, {
      typing_status: status
    });
  }

  mute(conversationId) {
    return this.client.post(`${this.path}/${conversationId}/mute`);
  }

  unmute(conversationId) {
    return this.client.post(`${this.path}/${conversationId}/unmute`);
  }

  sendEmailTranscript(conversationId: string, email) {
    return this.client.post(`${this.path}/${conversationId}/transcript`, { email });
  }

  getLabels(conversationId) {
    return this.client.get(`${this.path}/${conversationId}/labels`);
  }

  updateLabels(conversationId: string, labels) {
    return this.client.post(`${this.path}/${conversationId}/labels`, { labels });
  }
}
