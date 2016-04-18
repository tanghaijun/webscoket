﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace 通信.model
{
    public class SendTypeEnum
    {
        public enum SendType
        {
            /// <summary>
            /// 错误
            /// </summary>
            error = -1,
            /// <summary>
            /// 位置
            /// </summary>
            none = 0,
            /// <summary>
            /// 单个
            /// </summary>
            signal = 1,
            /// <summary>
            /// 群发
            /// </summary>
            all = 2,
            /// <summary>
            /// 登出
            /// </summary>
            logout = 3

        };
        public enum MessageState
        {
            ok = 0,
            failed = 1,
            error = 0
        }

    }
}
