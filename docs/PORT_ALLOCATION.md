# Local Project Port Allocation

This project keeps LibreChat/aid on a high local port range so it does not collide with AIP, P1, AIHub, sub2api, or common frontend dev servers.

| Port | Project | Service |
| --- | --- | --- |
| 53180 | aid / LibreChat | User client and API |
| 53181 | aid / LibreChat | Admin panel |
| 53182-53189 | aid / LibreChat | Reserved for future Dify and agent integration |

Avoid using `3000-3009` and `5000-5010` for this project; those ranges are reserved locally for existing P1Tech/AIP-related stacks.
