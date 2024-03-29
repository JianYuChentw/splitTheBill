create  database `split_the_bill`;
use`split_the_bill`;

create table `members` (
`members_id` int auto_increment primary key comment '會員id',
`level` int default 0 not null comment'會員等級',
`username` varchar(50) not null comment '會員姓名' ,
`phone_number` varchar(10) NOT NULL COMMENT '電話號碼',
`password` varchar(16) not null comment '密碼' ,
`email` varbinary(50) not null comment '信箱',
 `create_time` datetime  default current_timestamp comment '建立時間' ,
 `update_time` datetime  default current_timestamp comment '更新時間'
)comment '會員列表' ;

create table `expense_categories`(
`categories_id` int auto_increment primary key comment '類別id',
`category_title` varchar(50) not null comment '種類名稱'
)comment '消費類型';

create table `friends` (
`friends_id` int auto_increment primary key comment '好友表id',
`members_id1` int null null comment '會員id',
`members_id2` int null null comment '會員好友id',
`priority` int default 0 comment '優先度',
`create_time` datetime  default current_timestamp comment '建立時間',
foreign key(members_id1) references members(members_id),
foreign key(members_id2) references members(members_id)
) comment '好友關連表';

create table `bills`(
`bills_id` int auto_increment primary key comment '帳單id',
`creat_id` int not null comment'建立者',
`bills_title` varchar(50) not null comment'帳單名',
`status` int default 1 not null comment'帳單狀態, 0 = 刪除, 1 = 已建立, 2 = 拆帳中, 3 = 完成 ',
`bills_total` int default 0 comment '總金額',
`bills_create_time` datetime  default current_timestamp comment '建立時間',
`bills_update_time` datetime  default current_timestamp comment '更新時間',
foreign key(creat_id) references members(members_id)
) comment '帳單表';

create table`expenses`(
`expenses_id` int auto_increment primary key comment'消費明細id',
`consumer_id` int null null comment '消費者id',
`expenses_department` varchar(255) comment '消費細項, 0 = 刪除, 1 = 等候確認, 2 = 已核實',
`status` int default 1 not null comment'消費明細狀態',
`expenses_unit_price` int not null comment '金額',
`create_time` datetime  default current_timestamp comment '建立時間' ,
`update_time` datetime  default current_timestamp comment '更新時間',
foreign key(consumer_id) references members(members_id)
);

create table `bills_list`(
`bill_list_id`int auto_increment primary key comment'帳單中介id',
`bills_id` int not null comment '帳單id',
`expenses_id` int not null comment '消費明細id',
`categories_id` int default null comment '類別id',
foreign key(bills_id) references bills(bills_id),
foreign key(expenses_id) references expenses(expenses_id),
foreign key(categories_id) references expense_categories(categories_id)
)comment '帳單中介表';



