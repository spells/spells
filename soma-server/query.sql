create view
view_device as 
(
	select
		t1.idx as idx,
		t1.id as id,
		t1.name as name,
		t2.idx as master_idx,		
		t2.hash as master_hash,
		t2.name as master_name,
		t2.comment as master_comment,
		t2.status as master_status,
		t2.value as master_value,
		t2.register_ip as master_register_ip,
		t2.register_date as master_register_date,
		t2.connect_ip as master_connect_ip,
		t2.connect_date as master_connect_date,
		count(t3.idx) as alert_cnt,
		sum(if ( isnull(t3.confirm_date),0,1)) as confirmed_cnt,
		count(t3.idx)-sum(if ( isnull(t3.confirm_date),0,1)) as unconfirmed_cnt
	from user t1
	left join user_device t2 on t1.idx=t2.user_idx
	left join log_alert t3 on t2.idx=t3.master_idx
	where t2.idx is not null
	group by t2.idx
);



create view
view_device_sub as 
(
	select
		t1.idx as idx,
		t1.id as id,
		t1.name as name,
		t2.idx as master_idx,
		t2.hash as master_hash,		
		t2.name as master_name,
		t2.comment as master_comment,
		t2.status as master_status,
		t2.value as master_value,
		t2.register_ip as master_register_ip,
		t2.register_date as master_register_date,
		t2.connect_ip as master_connect_ip,
		t2.connect_date as master_connect_date,
		t3.idx as sub_idx,
		t3.hash as sub_hash,		
		t3.name as sub_name,
		t3.comment as sub_comment,
		t3.status as sub_status,
		t3.value as sub_value,
		t3.device_type as device_type,
		t4.control as device_control,
		t4.collect as device_conllect,
		t3.register_date as sub_register_date,
		t3.connect_date as sub_connect_date,
		count(t5.idx) as alert_cnt,
		sum(if ( isnull(t5.confirm_date),0,1)) as confirmed_cnt,
		count(t5.idx)-sum(if ( isnull(t5.confirm_date),0,1)) as unconfirmed_cnt
	from user t1
	left join user_device t2 on t1.idx=t2.user_idx
	left join user_device_sub t3 on t2.idx=t3.master_idx
	left join device_sub t4 on t3.device_type=t4.idx
	left join log_alert t5 on t3.idx=t5.sub_idx
	where t3.idx is not null
	group by t3.idx
);





select
	t1.idx as idx,
	t1.id as id,
	t1.name as name,
	t1.type as type,
	t1.login_cnt as login_cnt,
	t1.check_cnt as check_cnt,
	t1.login_ip as login_ip,
	t1.login_date as login_date,
	t1.join_ip as join_ip,
	t1.join_date as join_date,
	ifnull(t2.cnt,0) as master_cnt,
	ifnull(t3.cnt,0) as sub_cnt
from user t1
left join (
	select user_idx,count(*) as cnt from user_device
) t2 on t1.idx=t2.user_idx
left join (
	select user_idx,count(*) as cnt from user_device g1
	left join user_device_sub g2
	on g1.idx=g2.master_idx
) t3 on t1.idx=t3.user_idx
where ?