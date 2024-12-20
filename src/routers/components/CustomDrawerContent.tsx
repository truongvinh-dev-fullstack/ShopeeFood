import { Text, StyleSheet, ListRenderItem, FlatList, View, ScrollView, Platform } from 'react-native'
import React, { useCallback, useState } from 'react'
// import DrawerData from '../data/DataDrawers'
import { images } from 'src/assets/images'
import FastImage from 'react-native-fast-image'
import { DrawerItem } from './DrawerItem'
import { appColors, appConfig } from 'src/constants'
import { UnitOfWorkService } from 'src/controllers/api/unitOfWork-service'
import { StorageKey } from 'src/controllers/storage'
import { RouteNames } from '../RouteNames'
import { useIsFocused } from '@react-navigation/native'
import { checkPermission } from 'src/helpers/postServices'

const unitOfWork = new UnitOfWorkService()

export const CustomDrawerContent = () => {
	const isFocus = useIsFocused()


	const [drawerData, setDrawerData] = useState<Array<IDrawerItem>>([])

	const [salaryClassification, setSalaryClassification] = useState<any>()
	const [giamDoc, setGiamDoc] = useState<any>()
	const [isQL, setisQL] = useState<any>()

	React.useEffect( () => {
		fetchData()
		createDrawerData()
	}, [isFocus])



	const fetchData = async () => {
		let SALARY_CLASSIFICATION = await unitOfWork.storage.getItem(StorageKey.SALARY_CLASSIFICATION)
		setSalaryClassification(SALARY_CLASSIFICATION)
		let GiamDoc = await await unitOfWork.storage.getItem(StorageKey.GIAMDOC)
		setGiamDoc(GiamDoc)

		let IsQL = await await unitOfWork.storage.getItem(StorageKey.ISMANGAER)
		setisQL(IsQL)
		console.log(GiamDoc, IsQL)
		// let userId = await unitOfWork.storage.getItem(StorageKey.USER_ID)
		// let res = await unitOfWork.personal.takeUnSeenCount({
		// 	UserId: userId,
		// })
		// if (res?.statusCode == 200) {
		// 	setCount(res?.count)
		// }
	}

	const createDrawerData = async () => {
		let userPermission = await unitOfWork.storage.getItem(StorageKey.LIST_PERMISSION)
		
		let check_cham_cong = false

		let check_nhanSu = false
		let check_doiXe = false

		let check_dxdd = checkPermission('dx/doi-xe/danh-sach-de-xuat-dieu-dong/view' , userPermission)
		let check_ldd = checkPermission('dx/doi-xe/danh-sach-dieu-dong/view' , userPermission)
		let check_tx = checkPermission('dx/doi-xe/danh-sach-tai-xe/view' , userPermission)
		let check_khbd = checkPermission('dx/doi-xe/danh-sach-bao-duong-xe/view' , userPermission)
		let check_khsc = checkPermission('dx/doi-xe/danh-sach-xe-sua-chua/view' , userPermission)
		let check_qlcc = checkPermission('hrm/salary/tk-cham-cong/view' , userPermission)
		let check_dxxn = checkPermission('hrm/employee/request/list/view' , userPermission)
		let check_pl = checkPermission('hrm/salary/phieu-luong-list/view' , userPermission)
		let check_ttpt = checkPermission('dx/doi-xe/danh-sach-xe-thay-phu-tung/view' , userPermission)
		let check_dxtul = checkPermission('hrm/salary/request-salary-advance/view' , userPermission)
		let check_binhxet = checkPermission('hrm/employee/review' , userPermission)
		let check_qlct = checkPermission('pro/project/list/' , userPermission)
		let check_cvnct = checkPermission('as/assignment/assignment-list/view' , userPermission)

		if(check_qlcc){
			let UserId = await unitOfWork.storage.getItem(StorageKey.USER_ID)
			let res = await unitOfWork.personal.takePermissionTimeKeeping({
				UserId: UserId
			})
			if(res?.statusCode == 200){
				check_cham_cong = res?.isShowChamCong
			}
		}


		if(check_qlcc){
			check_nhanSu = true
		}else check_nhanSu = false

		if(check_dxdd || check_ldd || check_tx ){
			check_doiXe = true
		}else check_doiXe = false

		// if(isQL){
		// 	check_nhanSu = false
		// 	check_doiXe= false
		// }


		let _drawerData : IDrawerItem[] = [
			{ 
				label: 'Đề xuất xin nghỉ',
				id: 7, 
				routerName: TimeKeepName.PROPOSED_LEAVE,
				icon: <LenhDieuDongSVG />,
				isShow: check_dxxn
			},
			{
				label: 'Đề xuất tạm ứng lương',
				id: 8,
				routerName: TimeKeepName.SALARY_ADVANCE,
				icon: <LenhDieuDongSVG />,
				isShow: check_dxtul
			},
			{
				label: 'Phiếu lương',
				id: 9,
				routerName: TimeKeepName.PAY_NOTES,
				icon: <LenhDieuDongSVG />,
				isShow: check_pl
			},
			{
				label: 'Bình xét',
				id: 10,
				routerName: TimeKeepName.REVIEW,
				icon: <LenhDieuDongSVG />,
				isShow: check_binhxet
			},
			{
				label: 'Đề xuất sửa chữa/ thay thế phụ tùng',
				id: 11,
				routerName: FleetName.PARTS_REPLACEMENT_PLAN,
				icon: <KeHoachBaoDuong />,
				isShow: check_ttpt
			},
			{
				label: 'Kế hoạch bảo dưỡng',
				id: 3.4,
				routerName: FleetName.MAINTENANCE_PLAN,
				icon: <KeHoachBaoDuong />,
				isShow: check_khbd
			},
			// Quản lý công trình
			{
				label: 'Quản lý công trình',
				id: 1,
				icon: <DashboardIcon />,
				childs: [
					// {
					// 	label: 'Dashboard (Giám đốc)',
					// 	id: 1.1,
					// 	routerName: ProjectName.DASH_BOARD_DIRECTOR,
					// 	icon: <LeadsMenuIcon />,
					// 	isShow: true

					// },
					{
						label: 'Dashboard',
						id: 1.2,
						routerName: ProjectName.DASH_BOARD_PROJECT_MANGAGEMENT,
						icon: <OpportunityMenuIcon />,
						isShow: true
					},
					// {
					// 	label: 'Dashboard (Nhân viên)',
					// 	id: 1.3,
					// 	routerName: ProjectName.DASH_BOARD_EMPLOYEE,
					// 	icon: <CustomerMenuIcon />,
					// 	isShow: true
					// },
					{
						label: 'Danh sách công trình',
						id: 1.4,
						routerName: ProjectName.PROJECT_LIST,
						icon: <LenhDieuDongSVG />,
						isShow: true
					},
				],
				isShow: check_qlct
			},
			// quản lý đội xe
			// { 
			// 	label: 'Quản lý đội xe', 
			// 	id: 3, 
			// 	icon: <CarSVG /> ,
			// 	childs: [
			// 		{
			// 			label: 'Đề xuất điều động',
			// 			id: 3.1,
			// 			routerName: FleetName.PROPOSAL_MOBILIZATION,
			// 			icon: <DeXuatDieuDongSVG />,
			// 			isShow: check_dxdd
			// 		},
			// 		{
			// 			label: 'Lệnh điều động',
			// 			id: 3.2,
			// 			routerName: FleetName.VEHICLE_MOBILIZATION,
			// 			icon: <LenhDieuDongSVG />,
			// 			isShow: check_ldd
			// 		},
			// 		{
			// 			label: 'Kế hoạch sửa chữa',
			// 			id: 3.3,
			// 			routerName: FleetName.REPAIR_PLAN,
			// 			icon: <KeHoachBaoDuong />,
			// 			isShow: check_khsc
			// 		},
			// 		// {
			// 		// 	label: 'Kế hoạch bảo dưỡng',
			// 		// 	id: 3.4,
			// 		// 	routerName: FleetName.MAINTENANCE_PLAN,
			// 		// 	icon: <KeHoachBaoDuong />,
			// 		// 	isShow: check_khbd
			// 		// },
			// 		// {
			// 		// 	label: 'Kế hoạch thay thế phụ tùng',
			// 		// 	id: 3.5,
			// 		// 	routerName: FleetName.PARTS_REPLACEMENT_PLAN,
			// 		// 	icon: <KeHoachBaoDuong />,
			// 		// 	isShow: check_ttpt
			// 		// },
			// 		// {
			// 		// 	label: 'Tài xế',
			// 		// 	id: 3.6,
			// 		// 	routerName: FleetName.DRIVER,
			// 		// 	icon: <CustomerMenuIcon />,
			// 		// 	isShow: check_tx
			// 		// },
			// 	],
			// 	isShow: check_dxdd
			// },
			// quản lý nhân sự
			// { 
			// 	label: 'Quản lý Nhân sự', 
			// 	id: 5, 
			// 	icon: <HRMIcon />,
			// 	childs: [
			// 		{
			// 			label: 'Chấm công văn phòng/đội xe',
			// 			id: 5.1,
			// 			routerName: check_cham_cong ? TimeKeepName.TIME_KEEP_MANAGER : TimeKeepName.TIME_KEEP_STATISTICS,
			// 			icon: <DeXuatDieuDongSVG />,
			// 			isShow: check_qlcc
			// 		},
			// 		// {
			// 		// 	label: 'Chấm công công trình',
			// 		// 	id: 5.2,
			// 		// 	routerName: check_cham_cong ? TimeKeepName.TIME_KEEP_PROJECT : TimeKeepName.TIME_KEEP_PROJECT,
			// 		// 	icon: <DeXuatDieuDongSVG />,
			// 		// 	isShow: check_qlcc
			// 		// },
			// 		{
			// 			label: 'Chấm công tăng ca',
			// 			id: 5.3,
			// 			routerName: check_cham_cong ? TimeKeepName.TIME_KEEP_OVERTIME : TimeKeepName.TIME_KEEP_OVERTIME_STATISTICS,
			// 			icon: <DeXuatDieuDongSVG />,
			// 			isShow: check_qlcc
			// 		},
			// 		// {
			// 		// 	label: 'Đề xuất xin nghỉ',
			// 		// 	id: 5.4,
			// 		// 	routerName: TimeKeepName.PROPOSED_LEAVE,
			// 		// 	icon: <LenhDieuDongSVG />,
			// 		// 	isShow: check_dxxn
			// 		// },
			// 		// {
			// 		// 	label: 'Đề xuất tạm ứng lương',
			// 		// 	id: 5.5,
			// 		// 	routerName: TimeKeepName.SALARY_ADVANCE,
			// 		// 	icon: <LenhDieuDongSVG />,
			// 		// 	isShow: check_dxtul
			// 		// },
			// 		// {
			// 		// 	label: 'Phiếu lương',
			// 		// 	id: 5.6,
			// 		// 	routerName: TimeKeepName.PAY_NOTES,
			// 		// 	icon: <LenhDieuDongSVG />,
			// 		// 	isShow: check_pl
			// 		// },
			// 		// {
			// 		// 	label: 'Bình xét',
			// 		// 	id: 5.7,
			// 		// 	routerName: TimeKeepName.REVIEW,
			// 		// 	icon: <LenhDieuDongSVG />,
			// 		// 	isShow: check_binhxet
			// 		// },
			// 	],
			// 	isShow: check_nhanSu
			// },
			// { 
			// 	label: 'Quản lý công việc', 
			// 	id: 2, 
			// 	routerName: WorkName.WORK, 
			// 	icon: <WorkSVG />,
			// 	isShow: check_cvnct
			// },
			// { 
			// 	label: 'Quản lý tài khoản', 
			// 	id: 6, 
			// 	routerName: RouteNames.ACCOUNT, 
			// 	icon: <HRMIcon />,
			// 	isShow: true
			// },
		]
		setDrawerData(_drawerData)
	}

	const renderItem: ListRenderItem<any> = useCallback(({ item, index }) => {
		return <DrawerItem {...item} />
	}, [])

	return (
		<View style={styles.container}>
				 <View style={styles.body}>
					<ScrollView>
						<FastImage
							resizeMode="contain"
							style={{ height: 60, width: '100%', marginBottom: 20, marginTop: Platform.OS == 'ios' ? 50: 0 }}
							source={images.img_header_drawer}
						/>
						<FlatList
							data={drawerData}
							scrollEnabled={false}
							renderItem={renderItem}
							keyExtractor={(item, index) => item.id.toString()}
						/>
					</ScrollView>
					
				</View>
				
				<Text style={{ alignSelf: 'center', marginHorizontal: 22, textAlign: 'center' }}>
					Dong Tam Group - Phiên bản 1.0.0
				</Text> 
			
		{/* // 	<DrawerContentScrollView style={{ paddingHorizontal: 24, paddingTop: 48}}>
		// 		<FastImage
		// 			resizeMode="contain"
		// 			style={{ height: 60, width: '100%', marginBottom: 20 }}
		// 			source={images.img_header_drawer}
		// 		/>
		// 		<View style={{flex: 1, height: appConfig.height*0.75}}>
		// 			<FlatList
		// 				data={drawerData}
		// 				scrollEnabled={false}
		// 				renderItem={renderItem}
		// 				keyExtractor={(item, index) => item.id.toString()}
		// 			/>
		// 		</View>
				
				
		// 		<Text style={{ alignSelf: 'center', marginHorizontal: 22, textAlign: 'center' }}>
		// 			Dong Tam Group - Phiên bản 1.0.0
		// 		</Text>
		// 	</DrawerContentScrollView> */}
		</View>
		
	)
}
const styles = StyleSheet.create({
	item: {
		marginBottom: 12,
	},
	container: {
		height: appConfig.height - 30, 
		paddingHorizontal: 16,
	},
	body: {
		height: appConfig.height - 70, 
		marginBottom: 7
	}
})
