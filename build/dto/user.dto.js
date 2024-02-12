"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    email;
    id;
    nickname;
    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.nickname = model.nickname;
    }
}
exports.default = UserDto;
//# sourceMappingURL=user.dto.js.map