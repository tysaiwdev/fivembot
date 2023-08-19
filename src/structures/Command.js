export default class Command {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.ephemeral = options.ephemeral
        this.description = options.description
        this.options = options.options
        this.default_member_permissions = options.default_member_permissions
        this.nsfw = options.nsfw
        this.type = options.type
        this.dm_permission = options.dm_permission
        this.name_localizations = options.name_localizations
        this.description_localizations = options.description_localizations
    }
}