/*
 Navicat Premium Data Transfer

 Source Server         : LOCAL_SQLEXPRESS
 Source Server Type    : SQL Server
 Source Server Version : 15002104
 Source Host           : localhost:1433
 Source Catalog        : PCM
 Source Schema         : batch18csr

 Target Server Type    : SQL Server
 Target Server Version : 15002104
 File Encoding         : 65001

 Date: 02/01/2024 20:30:49
*/


-- ----------------------------
-- Table structure for MapAksesMenu
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MapAksesMenu]') AND type IN ('U'))
	DROP TABLE [dbo].[MapAksesMenu]
GO

CREATE TABLE [dbo].[MapAksesMenu] (
  [IDAkses] bigint  NOT NULL,
  [IDMenu] bigint  NOT NULL
)
GO

ALTER TABLE [dbo].[MapAksesMenu] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MapAksesMenu
-- ----------------------------
INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'1', N'1')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'1', N'2')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'1', N'3')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'1', N'6')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'1', N'13')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'1', N'14')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'1', N'15')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'2', N'1')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'3', N'5')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'3', N'6')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'3', N'7')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'4', N'8')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'4', N'9')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'4', N'10')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'4')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'5')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'6')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'7')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'11')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'12')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'13')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'14')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'15')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'31')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'33')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'35')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'36')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'37')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'5', N'38')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'1')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'2')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'3')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'4')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'5')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'6')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'7')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'8')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'9')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'10')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'11')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'12')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'13')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'14')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'6', N'15')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'7', N'1')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'7', N'2')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'7', N'29')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'7', N'30')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'8', N'1')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'8', N'2')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'8', N'3')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'9', N'37')
GO

INSERT INTO [dbo].[MapAksesMenu] ([IDAkses], [IDMenu]) VALUES (N'9', N'38')
GO


-- ----------------------------
-- Table structure for MapPengarangBuku
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MapPengarangBuku]') AND type IN ('U'))
	DROP TABLE [dbo].[MapPengarangBuku]
GO

CREATE TABLE [dbo].[MapPengarangBuku] (
  [IDBuku] bigint  NOT NULL,
  [IDPengarang] bigint  NOT NULL
)
GO

ALTER TABLE [dbo].[MapPengarangBuku] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MapPengarangBuku
-- ----------------------------
INSERT INTO [dbo].[MapPengarangBuku] ([IDBuku], [IDPengarang]) VALUES (N'1', N'1')
GO

INSERT INTO [dbo].[MapPengarangBuku] ([IDBuku], [IDPengarang]) VALUES (N'3', N'1')
GO

INSERT INTO [dbo].[MapPengarangBuku] ([IDBuku], [IDPengarang]) VALUES (N'3', N'4')
GO


-- ----------------------------
-- Table structure for MstAkses
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MstAkses]') AND type IN ('U'))
	DROP TABLE [dbo].[MstAkses]
GO

CREATE TABLE [dbo].[MstAkses] (
  [IDAkses] bigint  IDENTITY(1,1) NOT NULL,
  [CreatedBy] int  NOT NULL,
  [CreatedDate] datetime2(7)  NOT NULL,
  [IsActive] bit  NOT NULL,
  [ModifiedBy] int  NULL,
  [ModifiedDate] datetime2(7)  NULL,
  [NamaAkses] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [IDDivisi] bigint  NULL
)
GO

ALTER TABLE [dbo].[MstAkses] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MstAkses
-- ----------------------------
SET IDENTITY_INSERT [dbo].[MstAkses] ON
GO

INSERT INTO [dbo].[MstAkses] ([IDAkses], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [NamaAkses], [IDDivisi]) VALUES (N'1', N'1', N'2023-12-19 16:16:24.0000000', N'1', N'1', N'2023-12-28 20:26:42.5970000', N'Member', N'1')
GO

INSERT INTO [dbo].[MstAkses] ([IDAkses], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [NamaAkses], [IDDivisi]) VALUES (N'2', N'1', N'2023-12-19 16:23:33.1410000', N'1', NULL, NULL, N'Member Welcome', N'1')
GO

INSERT INTO [dbo].[MstAkses] ([IDAkses], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [NamaAkses], [IDDivisi]) VALUES (N'3', N'1', N'2023-12-19 16:27:44.2930000', N'1', NULL, NULL, N'IT DEV', N'3')
GO

INSERT INTO [dbo].[MstAkses] ([IDAkses], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [NamaAkses], [IDDivisi]) VALUES (N'4', N'1', N'2023-12-19 16:27:44.2930000', N'1', NULL, NULL, N'IT INFRA', N'3')
GO

INSERT INTO [dbo].[MstAkses] ([IDAkses], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [NamaAkses], [IDDivisi]) VALUES (N'5', N'1', N'2023-12-19 16:27:44.2930000', N'1', N'1', N'2024-01-02 19:57:26.5500000', N'ADMIN', N'3')
GO

INSERT INTO [dbo].[MstAkses] ([IDAkses], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [NamaAkses], [IDDivisi]) VALUES (N'6', N'1', N'2023-12-28 10:12:27.9850000', N'1', NULL, NULL, N'ADMIN2', N'2')
GO

INSERT INTO [dbo].[MstAkses] ([IDAkses], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [NamaAkses], [IDDivisi]) VALUES (N'7', N'1', N'2023-12-28 20:02:35.9670000', N'1', N'1', N'2023-12-28 20:04:53.3690000', N'OPERATIONSS', N'22')
GO

INSERT INTO [dbo].[MstAkses] ([IDAkses], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [NamaAkses], [IDDivisi]) VALUES (N'8', N'1', N'2023-12-29 21:01:30.2450000', N'1', NULL, NULL, N'CUSTOMER', N'1')
GO

INSERT INTO [dbo].[MstAkses] ([IDAkses], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [NamaAkses], [IDDivisi]) VALUES (N'9', N'1', N'2024-01-02 19:56:56.7080000', N'1', NULL, NULL, N'FINANCE', N'24')
GO

SET IDENTITY_INSERT [dbo].[MstAkses] OFF
GO


-- ----------------------------
-- Table structure for MstBuku
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MstBuku]') AND type IN ('U'))
	DROP TABLE [dbo].[MstBuku]
GO

CREATE TABLE [dbo].[MstBuku] (
  [IDBuku] bigint  IDENTITY(1,1) NOT NULL,
  [CreatedBy] int  NOT NULL,
  [CreatedDate] datetime2(7)  NOT NULL,
  [IsActive] bit  NOT NULL,
  [Judul] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [ModifiedBy] int  NULL,
  [ModifiedDate] datetime2(7)  NULL,
  [Tahun] smallint  NULL,
  [IDKategoriBuku] bigint  NULL
)
GO

ALTER TABLE [dbo].[MstBuku] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MstBuku
-- ----------------------------
SET IDENTITY_INSERT [dbo].[MstBuku] ON
GO

INSERT INTO [dbo].[MstBuku] ([IDBuku], [CreatedBy], [CreatedDate], [IsActive], [Judul], [ModifiedBy], [ModifiedDate], [Tahun], [IDKategoriBuku]) VALUES (N'1', N'1', N'2023-12-30 21:56:41.6900000', N'1', N'Femina', N'1', N'2023-12-30 21:56:52.1040000', N'2010', N'1')
GO

INSERT INTO [dbo].[MstBuku] ([IDBuku], [CreatedBy], [CreatedDate], [IsActive], [Judul], [ModifiedBy], [ModifiedDate], [Tahun], [IDKategoriBuku]) VALUES (N'3', N'1', N'2023-12-30 22:02:48.2740000', N'1', N'Bobo', N'1', N'2024-01-02 19:58:40.6120000', N'1990', N'2')
GO

SET IDENTITY_INSERT [dbo].[MstBuku] OFF
GO


-- ----------------------------
-- Table structure for MstDivisi
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MstDivisi]') AND type IN ('U'))
	DROP TABLE [dbo].[MstDivisi]
GO

CREATE TABLE [dbo].[MstDivisi] (
  [IDDivisi] bigint  IDENTITY(1,1) NOT NULL,
  [CreatedBy] int  NOT NULL,
  [CreatedDate] datetime2(7)  NOT NULL,
  [DeskripsiDivisi] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [IsActive] bit  NOT NULL,
  [KodeDivisi] varchar(25) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [ModifiedBy] int  NULL,
  [ModifiedDate] datetime2(7)  NULL,
  [NamaDivisi] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[MstDivisi] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MstDivisi
-- ----------------------------
SET IDENTITY_INSERT [dbo].[MstDivisi] ON
GO

INSERT INTO [dbo].[MstDivisi] ([IDDivisi], [CreatedBy], [CreatedDate], [DeskripsiDivisi], [IsActive], [KodeDivisi], [ModifiedBy], [ModifiedDate], [NamaDivisi]) VALUES (N'1', N'1', N'2023-12-19 16:15:45.0000000', N'Member Fresh', N'1', N'M001', NULL, NULL, N'MEMBER')
GO

INSERT INTO [dbo].[MstDivisi] ([IDDivisi], [CreatedBy], [CreatedDate], [DeskripsiDivisi], [IsActive], [KodeDivisi], [ModifiedBy], [ModifiedDate], [NamaDivisi]) VALUES (N'2', N'1', N'2023-12-19 16:18:56.6250000', N'SALES FORCE SALES FORCE SALES FORCE SALES FORCE', N'1', N'MKT01', NULL, NULL, N'Marketing')
GO

INSERT INTO [dbo].[MstDivisi] ([IDDivisi], [CreatedBy], [CreatedDate], [DeskripsiDivisi], [IsActive], [KodeDivisi], [ModifiedBy], [ModifiedDate], [NamaDivisi]) VALUES (N'3', N'1', N'2023-12-19 16:18:56.6250000', N'Untuk Teknologi Informasi', N'1', N'IT01', NULL, NULL, N'Information Technology')
GO

INSERT INTO [dbo].[MstDivisi] ([IDDivisi], [CreatedBy], [CreatedDate], [DeskripsiDivisi], [IsActive], [KodeDivisi], [ModifiedBy], [ModifiedDate], [NamaDivisi]) VALUES (N'22', N'1', N'2023-12-28 20:01:39.0140000', N'OPERATIONS FOR OPERATIONAL', N'1', N'OPS01', NULL, NULL, N'OPERASIONAL')
GO

INSERT INTO [dbo].[MstDivisi] ([IDDivisi], [CreatedBy], [CreatedDate], [DeskripsiDivisi], [IsActive], [KodeDivisi], [ModifiedBy], [ModifiedDate], [NamaDivisi]) VALUES (N'23', N'1', N'2023-12-29 20:52:08.9210000', N'Untuk KESEJAHTERAAAN STAFF DAN KARYAWAN GEDUNG', N'1', N'SCRTY', NULL, NULL, N'KEAMANAN DAN KESEHATAN')
GO

INSERT INTO [dbo].[MstDivisi] ([IDDivisi], [CreatedBy], [CreatedDate], [DeskripsiDivisi], [IsActive], [KodeDivisi], [ModifiedBy], [ModifiedDate], [NamaDivisi]) VALUES (N'24', N'1', N'2024-01-02 19:55:23.2850000', N'FinanceFinanceFinanceFinanceFinanceFinance', N'1', N'FIN01', NULL, NULL, N'FINANCE')
GO

SET IDENTITY_INSERT [dbo].[MstDivisi] OFF
GO


-- ----------------------------
-- Table structure for MstItem
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MstItem]') AND type IN ('U'))
	DROP TABLE [dbo].[MstItem]
GO

CREATE TABLE [dbo].[MstItem] (
  [IDItem] bigint  IDENTITY(1,1) NOT NULL,
  [CreatedBy] int  NOT NULL,
  [CreatedDate] datetime2(7)  NOT NULL,
  [HargaPerUnit] float(53)  NULL,
  [IsActive] bit  NOT NULL,
  [ModifiedBy] int  NULL,
  [ModifiedDate] datetime2(7)  NULL,
  [NamaItem] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [Stock] int DEFAULT 0 NULL
)
GO

ALTER TABLE [dbo].[MstItem] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MstItem
-- ----------------------------
SET IDENTITY_INSERT [dbo].[MstItem] ON
GO

INSERT INTO [dbo].[MstItem] ([IDItem], [CreatedBy], [CreatedDate], [HargaPerUnit], [IsActive], [ModifiedBy], [ModifiedDate], [NamaItem], [Stock]) VALUES (N'1', N'1', N'2023-12-29 15:31:34.2300000', N'12875', N'1', NULL, NULL, N'Ciki Taro', N'30')
GO

INSERT INTO [dbo].[MstItem] ([IDItem], [CreatedBy], [CreatedDate], [HargaPerUnit], [IsActive], [ModifiedBy], [ModifiedDate], [NamaItem], [Stock]) VALUES (N'2', N'1', N'2023-12-29 15:31:50.3150000', N'2855', N'1', NULL, NULL, N'Mie Sedap', N'50')
GO

SET IDENTITY_INSERT [dbo].[MstItem] OFF
GO


-- ----------------------------
-- Table structure for MstKategoriBuku
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MstKategoriBuku]') AND type IN ('U'))
	DROP TABLE [dbo].[MstKategoriBuku]
GO

CREATE TABLE [dbo].[MstKategoriBuku] (
  [IDKategoriBuku] bigint  IDENTITY(1,1) NOT NULL,
  [CreatedBy] int  NOT NULL,
  [CreatedDate] datetime2(7)  NOT NULL,
  [IsActive] bit  NOT NULL,
  [ModifiedBy] int  NULL,
  [ModifiedDate] datetime2(7)  NULL,
  [NamaKategoriBuku] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[MstKategoriBuku] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MstKategoriBuku
-- ----------------------------
SET IDENTITY_INSERT [dbo].[MstKategoriBuku] ON
GO

INSERT INTO [dbo].[MstKategoriBuku] ([IDKategoriBuku], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [NamaKategoriBuku]) VALUES (N'1', N'1', N'2023-12-29 20:42:51.3310000', N'1', NULL, NULL, N'MAJALAH')
GO

INSERT INTO [dbo].[MstKategoriBuku] ([IDKategoriBuku], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [NamaKategoriBuku]) VALUES (N'2', N'1', N'2023-12-29 20:43:16.9440000', N'1', N'1', N'2023-12-29 20:43:30.1090000', N'BUKU GAMBAR KARTUN')
GO

SET IDENTITY_INSERT [dbo].[MstKategoriBuku] OFF
GO


-- ----------------------------
-- Table structure for MstMenu
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MstMenu]') AND type IN ('U'))
	DROP TABLE [dbo].[MstMenu]
GO

CREATE TABLE [dbo].[MstMenu] (
  [IDMenu] bigint  IDENTITY(1,1) NOT NULL,
  [CreatedBy] int  NOT NULL,
  [CreatedDate] datetime2(7)  NOT NULL,
  [EndPoints] varchar(30) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [IsActive] bit  NOT NULL,
  [ModifiedBy] int  NULL,
  [ModifiedDate] datetime2(7)  NULL,
  [NamaMenu] varchar(25) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [PathMenu] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [IDMenuHeader] bigint  NULL
)
GO

ALTER TABLE [dbo].[MstMenu] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MstMenu
-- ----------------------------
SET IDENTITY_INSERT [dbo].[MstMenu] ON
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'1', N'1', N'2023-12-19 16:20:58.0360000', N'end point end point end point ', N'1', N'1', N'2023-12-22 06:58:07.9410000', N'Member Welcome', N'/home', N'1')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'2', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'HR ONE', N'/home', N'2')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'3', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', N'1', N'2023-12-22 06:58:02.6110000', N'HR TWO', N'/home', N'2')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'4', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'HR THREE', N'/home', N'2')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'5', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'IT DEV ONE', N'/home', N'3')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'6', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'IT DEV TWO', N'/home', N'3')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'7', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'IT DEV THREE', N'/home', N'3')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'8', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'IT INFRA ONE', N'/home', N'3')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'9', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'IT INFRA TWO', N'/home', N'3')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'10', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'IT INFRA THREE', N'/home', N'3')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'11', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'DIVISI', N'/divisi', N'4')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'12', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'MENU HEADER', N'/menuheader', N'4')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'13', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'MENU', N'/menu', N'4')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'14', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'AKSES', N'/akses', N'4')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'15', N'1', N'2023-12-19 16:22:04.8140000', N'end point end point end point ', N'1', NULL, NULL, N'USER', N'/user', N'4')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'29', N'1', N'2023-12-28 19:57:39.1330000', N'localhost:8080-ddddd', N'1', NULL, NULL, N'Opeation_1', N'/ops01', N'13')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'30', N'1', N'2023-12-28 19:59:51.0320000', N'localhost:8080-dddd', N'1', NULL, NULL, N'Opeation_2', N'/ops02', N'13')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'31', N'1', N'2023-12-29 14:59:44.2230000', N'localhost:8080-dddd', N'1', NULL, NULL, N'Item', N'/item', N'14')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'32', N'1', N'2023-12-29 14:59:44.2230000', N'localhost:8080-dddd', N'1', NULL, NULL, N'Penjualan', N'/penjualan', N'14')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'33', N'1', N'2023-12-29 19:57:14.0970000', N'localhost:8080-xxxx', N'1', NULL, NULL, N'Kategori Buku', N'/katbuku', N'15')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'35', N'1', N'2023-12-30 21:23:35.7340000', N'localhost:8080-dddd', N'1', NULL, NULL, N'BUKU', N'/buku', N'15')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'36', N'1', N'2024-01-02 16:15:46.7250000', N'localhost:8080-xxxx', N'1', NULL, NULL, N'Pengarang', N'/pengarang', N'15')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'37', N'1', N'2024-01-02 19:56:06.4820000', N'localhost:8080-xxxx', N'1', NULL, NULL, N'FINANCE-1', N'/home', N'16')
GO

INSERT INTO [dbo].[MstMenu] ([IDMenu], [CreatedBy], [CreatedDate], [EndPoints], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenu], [PathMenu], [IDMenuHeader]) VALUES (N'38', N'1', N'2024-01-02 19:56:29.8590000', N'localhost:8080-yyyy', N'1', NULL, NULL, N'FINANCE-2', N'/home', N'16')
GO

SET IDENTITY_INSERT [dbo].[MstMenu] OFF
GO


-- ----------------------------
-- Table structure for MstMenuHeader
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MstMenuHeader]') AND type IN ('U'))
	DROP TABLE [dbo].[MstMenuHeader]
GO

CREATE TABLE [dbo].[MstMenuHeader] (
  [IDMenuHeader] bigint  IDENTITY(1,1) NOT NULL,
  [CreatedBy] int  NOT NULL,
  [CreatedDate] datetime2(7)  NOT NULL,
  [DeskripsiMenuHeader] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'ini deskripsi' NULL,
  [IsActive] bit  NOT NULL,
  [ModifiedBy] int  NULL,
  [ModifiedDate] datetime2(7)  NULL,
  [NamaMenuHeader] char(20) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'ini nama' NULL
)
GO

ALTER TABLE [dbo].[MstMenuHeader] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MstMenuHeader
-- ----------------------------
SET IDENTITY_INSERT [dbo].[MstMenuHeader] ON
GO

INSERT INTO [dbo].[MstMenuHeader] ([IDMenuHeader], [CreatedBy], [CreatedDate], [DeskripsiMenuHeader], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenuHeader]) VALUES (N'1', N'1', N'2023-12-19 16:20:01.1720000', N'Group Menu Default', N'1', NULL, NULL, N'Member              ')
GO

INSERT INTO [dbo].[MstMenuHeader] ([IDMenuHeader], [CreatedBy], [CreatedDate], [DeskripsiMenuHeader], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenuHeader]) VALUES (N'2', N'1', N'2023-12-19 16:20:06.5820000', N'Group Untuk Modul Human Resources', N'1', NULL, NULL, N'HR                  ')
GO

INSERT INTO [dbo].[MstMenuHeader] ([IDMenuHeader], [CreatedBy], [CreatedDate], [DeskripsiMenuHeader], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenuHeader]) VALUES (N'3', N'1', N'2023-12-19 16:20:06.5820000', N'Group Untuk Modul IT', N'1', NULL, NULL, N'IT                  ')
GO

INSERT INTO [dbo].[MstMenuHeader] ([IDMenuHeader], [CreatedBy], [CreatedDate], [DeskripsiMenuHeader], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenuHeader]) VALUES (N'4', N'1', N'2023-12-19 16:20:06.5820000', N'Group Untuk Setup User Management', N'1', NULL, NULL, N'User Management     ')
GO

INSERT INTO [dbo].[MstMenuHeader] ([IDMenuHeader], [CreatedBy], [CreatedDate], [DeskripsiMenuHeader], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenuHeader]) VALUES (N'8', N'1', N'2023-12-22 05:55:50.0000000', N'Teesting sementarar sajahhhh Teesting sementarar sajahhhhTeesting sementarar sajahhhh', N'1', NULL, NULL, N'Testing             ')
GO

INSERT INTO [dbo].[MstMenuHeader] ([IDMenuHeader], [CreatedBy], [CreatedDate], [DeskripsiMenuHeader], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenuHeader]) VALUES (N'13', N'1', N'2023-12-28 19:54:50.4630000', N'Operations for Operational', N'1', NULL, NULL, N'OPS                 ')
GO

INSERT INTO [dbo].[MstMenuHeader] ([IDMenuHeader], [CreatedBy], [CreatedDate], [DeskripsiMenuHeader], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenuHeader]) VALUES (N'14', N'1', N'2023-12-29 14:57:08.8850000', N'Jual Beli Example', N'1', NULL, NULL, N'JUALBELI            ')
GO

INSERT INTO [dbo].[MstMenuHeader] ([IDMenuHeader], [CreatedBy], [CreatedDate], [DeskripsiMenuHeader], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenuHeader]) VALUES (N'15', N'1', N'2023-12-29 19:56:07.1820000', N'Untuk TA Flow Web Buku', N'1', NULL, NULL, N'BOOK                ')
GO

INSERT INTO [dbo].[MstMenuHeader] ([IDMenuHeader], [CreatedBy], [CreatedDate], [DeskripsiMenuHeader], [IsActive], [ModifiedBy], [ModifiedDate], [NamaMenuHeader]) VALUES (N'16', N'1', N'2024-01-02 19:55:40.9140000', N'FinanceFinanceFinanceFinanceFinance', N'1', NULL, NULL, N'FINANCE             ')
GO

SET IDENTITY_INSERT [dbo].[MstMenuHeader] OFF
GO


-- ----------------------------
-- Table structure for MstPengarang
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MstPengarang]') AND type IN ('U'))
	DROP TABLE [dbo].[MstPengarang]
GO

CREATE TABLE [dbo].[MstPengarang] (
  [IDPengarang] bigint  IDENTITY(1,1) NOT NULL,
  [alamat] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [CreatedBy] int  NOT NULL,
  [CreatedDate] datetime2(7)  NOT NULL,
  [IsActive] bit  NOT NULL,
  [ModifiedBy] int  NULL,
  [ModifiedDate] datetime2(7)  NULL,
  [namaPengarang] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL
)
GO

ALTER TABLE [dbo].[MstPengarang] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MstPengarang
-- ----------------------------
SET IDENTITY_INSERT [dbo].[MstPengarang] ON
GO

INSERT INTO [dbo].[MstPengarang] ([IDPengarang], [alamat], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [namaPengarang]) VALUES (N'1', N'Bogor', N'1', N'2024-01-02 16:17:38.7040000', N'1', NULL, NULL, N'John Wibisini')
GO

INSERT INTO [dbo].[MstPengarang] ([IDPengarang], [alamat], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [namaPengarang]) VALUES (N'2', N'New Pademangan', N'1', N'2024-01-02 18:06:42.0500000', N'1', NULL, NULL, N'Melamin GoesLaw')
GO

INSERT INTO [dbo].[MstPengarang] ([IDPengarang], [alamat], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [namaPengarang]) VALUES (N'3', N'Bojonegoro', N'1', N'2024-01-02 19:49:40.6680000', N'1', NULL, NULL, N'Irsyad Hakeem')
GO

INSERT INTO [dbo].[MstPengarang] ([IDPengarang], [alamat], [CreatedBy], [CreatedDate], [IsActive], [ModifiedBy], [ModifiedDate], [namaPengarang]) VALUES (N'4', N'Jakarta Barat', N'1', N'2024-01-02 19:52:40.7660000', N'1', NULL, NULL, N'Joe Indahsi')
GO

SET IDENTITY_INSERT [dbo].[MstPengarang] OFF
GO


-- ----------------------------
-- Table structure for MstPenjualan
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MstPenjualan]') AND type IN ('U'))
	DROP TABLE [dbo].[MstPenjualan]
GO

CREATE TABLE [dbo].[MstPenjualan] (
  [IDPenjualan] bigint  IDENTITY(1,1) NOT NULL,
  [CreatedBy] int  NOT NULL,
  [CreatedDate] datetime2(7)  NOT NULL,
  [IsActive] bit  NOT NULL,
  [ModifiedBy] int  NULL,
  [ModifiedDate] datetime2(7)  NULL,
  [Struk] char(15) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [TotalDiskon] float(53)  NOT NULL,
  [TotalItem] tinyint  NOT NULL,
  [TotalPembelian] float(53)  NULL
)
GO

ALTER TABLE [dbo].[MstPenjualan] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MstPenjualan
-- ----------------------------
SET IDENTITY_INSERT [dbo].[MstPenjualan] ON
GO

SET IDENTITY_INSERT [dbo].[MstPenjualan] OFF
GO


-- ----------------------------
-- Table structure for MstPenjualanDetail
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MstPenjualanDetail]') AND type IN ('U'))
	DROP TABLE [dbo].[MstPenjualanDetail]
GO

CREATE TABLE [dbo].[MstPenjualanDetail] (
  [IDPenjualanDetail] bigint  IDENTITY(1,1) NOT NULL,
  [CreatedBy] int  NOT NULL,
  [CreatedDate] datetime2(7)  NOT NULL,
  [HargaPerItem] float(53)  NOT NULL,
  [IsActive] bit  NOT NULL,
  [JumlahBarang] smallint  NOT NULL,
  [ModifiedBy] int  NULL,
  [ModifiedDate] datetime2(7)  NULL,
  [NominalDiskon] float(53)  NULL,
  [Diskon] float(53)  NOT NULL,
  [IDItem] bigint  NULL
)
GO

ALTER TABLE [dbo].[MstPenjualanDetail] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MstPenjualanDetail
-- ----------------------------
SET IDENTITY_INSERT [dbo].[MstPenjualanDetail] ON
GO

SET IDENTITY_INSERT [dbo].[MstPenjualanDetail] OFF
GO


-- ----------------------------
-- Table structure for MstUser
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[MstUser]') AND type IN ('U'))
	DROP TABLE [dbo].[MstUser]
GO

CREATE TABLE [dbo].[MstUser] (
  [IDUser] bigint  IDENTITY(1,1) NOT NULL,
  [CreatedBy] int  NOT NULL,
  [CreatedDate] datetime2(7)  NOT NULL,
  [Email] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [IsActive] bit  NOT NULL,
  [LastLoginDate] datetime2(7)  NULL,
  [ModifiedBy] int  NULL,
  [ModifiedDate] datetime2(7)  NULL,
  [NamaLengkap] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [NoHP] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [Password] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [PasswordCounter] int  NULL,
  [TanggalLahir] date  NULL,
  [Token] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [TokenCounter] int  NULL,
  [UserName] varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [IDAkses] bigint  NULL
)
GO

ALTER TABLE [dbo].[MstUser] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of MstUser
-- ----------------------------
SET IDENTITY_INSERT [dbo].[MstUser] ON
GO

INSERT INTO [dbo].[MstUser] ([IDUser], [CreatedBy], [CreatedDate], [Email], [IsActive], [LastLoginDate], [ModifiedBy], [ModifiedDate], [NamaLengkap], [NoHP], [Password], [PasswordCounter], [TanggalLahir], [Token], [TokenCounter], [UserName], [IDAkses]) VALUES (N'1', N'1', N'2023-12-19 16:16:53.3500000', N'poll.chihuy@gmail.com', N'1', N'2024-01-02 19:57:37.6610000', N'1', N'2024-01-02 19:57:37.6610000', N'PaulChristianNext', N'6287880405806', N'$2a$11$IvzK7jDkXJAdlw9Rycv5tud7TJaVyAaNcC/D1ksNhUySEHV2Ij.ca', N'0', N'1995-12-25', N'$2a$11$tvoxRkLJNOP.ai9zAzjMHeIF7sST.THWzSgjN1a7Xf7O9Ts3HwDd.', N'0', N'pollchihuy111', N'5')
GO

INSERT INTO [dbo].[MstUser] ([IDUser], [CreatedBy], [CreatedDate], [Email], [IsActive], [LastLoginDate], [ModifiedBy], [ModifiedDate], [NamaLengkap], [NoHP], [Password], [PasswordCounter], [TanggalLahir], [Token], [TokenCounter], [UserName], [IDAkses]) VALUES (N'2', N'1', N'2023-12-19 18:24:19.6140000', N'poll.exact@gmail.com', N'1', N'2023-12-28 19:49:11.6460000', N'2', N'2023-12-29 12:41:11.1370000', N'Paul Paulo Paul', N'6281286016416', N'$2a$11$sz0jmEtO63/qkymguwhVTeI/mpOfiXLVHl1F5TMnbO/TvvU3OSvZi', N'0', N'1987-12-25', N'$2a$11$philNtg6kv5vKvz0aLQ6BelexPBXZf0Geof4RVIym93sypTCg653O', N'0', N'pollchihuy132', N'2')
GO

INSERT INTO [dbo].[MstUser] ([IDUser], [CreatedBy], [CreatedDate], [Email], [IsActive], [LastLoginDate], [ModifiedBy], [ModifiedDate], [NamaLengkap], [NoHP], [Password], [PasswordCounter], [TanggalLahir], [Token], [TokenCounter], [UserName], [IDAkses]) VALUES (N'5', N'1', N'2023-12-28 18:54:15.6360000', N'poll.exactt@gmail.com', N'0', NULL, N'5', N'2023-12-28 18:57:19.0210000', N'PaulChristianNext', N'6287880405803', N'$2a$11$6tM0CE1FNKBuRnEyoGfH3.AC9FqLLAEPiD.MEUAWW73k.rnaUgEFC', N'0', N'1995-12-25', N'$2a$11$42dj3PDmJsfpKD8WsQm.5Oxw3wfZoPDLYAV7u.h8Yl8hKIpUtvosq', N'1', N'pollchihuy14', NULL)
GO

SET IDENTITY_INSERT [dbo].[MstUser] OFF
GO


-- ----------------------------
-- Uniques structure for table MapAksesMenu
-- ----------------------------
ALTER TABLE [dbo].[MapAksesMenu] ADD CONSTRAINT [UK61m8nb84ts4aymf0adi0hngv5] UNIQUE NONCLUSTERED ([IDAkses] ASC, [IDMenu] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Uniques structure for table MapPengarangBuku
-- ----------------------------
ALTER TABLE [dbo].[MapPengarangBuku] ADD CONSTRAINT [UK8up1qase1tf9gm7ol5lhvh6jr] UNIQUE NONCLUSTERED ([IDBuku] ASC, [IDPengarang] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for MstAkses
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[MstAkses]', RESEED, 9)
GO


-- ----------------------------
-- Primary Key structure for table MstAkses
-- ----------------------------
ALTER TABLE [dbo].[MstAkses] ADD CONSTRAINT [PK__MstAkses__54B7D338655BADED] PRIMARY KEY CLUSTERED ([IDAkses])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for MstBuku
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[MstBuku]', RESEED, 3)
GO


-- ----------------------------
-- Primary Key structure for table MstBuku
-- ----------------------------
ALTER TABLE [dbo].[MstBuku] ADD CONSTRAINT [PK__MstBuku__088F45679C22A80B] PRIMARY KEY CLUSTERED ([IDBuku])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for MstDivisi
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[MstDivisi]', RESEED, 24)
GO


-- ----------------------------
-- Primary Key structure for table MstDivisi
-- ----------------------------
ALTER TABLE [dbo].[MstDivisi] ADD CONSTRAINT [PK__MstDivis__DF97AFD6FA79AC0D] PRIMARY KEY CLUSTERED ([IDDivisi])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for MstItem
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[MstItem]', RESEED, 2)
GO


-- ----------------------------
-- Uniques structure for table MstItem
-- ----------------------------
ALTER TABLE [dbo].[MstItem] ADD CONSTRAINT [UK_tiytpe261lkm6xjmb40u9skn3] UNIQUE NONCLUSTERED ([NamaItem] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table MstItem
-- ----------------------------
ALTER TABLE [dbo].[MstItem] ADD CONSTRAINT [PK__MstItem__C9778A1014EB11EC] PRIMARY KEY CLUSTERED ([IDItem])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for MstKategoriBuku
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[MstKategoriBuku]', RESEED, 2)
GO


-- ----------------------------
-- Primary Key structure for table MstKategoriBuku
-- ----------------------------
ALTER TABLE [dbo].[MstKategoriBuku] ADD CONSTRAINT [PK__MstKateg__A3ECABB24AC13932] PRIMARY KEY CLUSTERED ([IDKategoriBuku])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for MstMenu
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[MstMenu]', RESEED, 38)
GO


-- ----------------------------
-- Primary Key structure for table MstMenu
-- ----------------------------
ALTER TABLE [dbo].[MstMenu] ADD CONSTRAINT [PK__MstMenu__089D3C22933A85E9] PRIMARY KEY CLUSTERED ([IDMenu])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for MstMenuHeader
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[MstMenuHeader]', RESEED, 16)
GO


-- ----------------------------
-- Primary Key structure for table MstMenuHeader
-- ----------------------------
ALTER TABLE [dbo].[MstMenuHeader] ADD CONSTRAINT [PK__MstMenuH__37AECB6298359FE1] PRIMARY KEY CLUSTERED ([IDMenuHeader])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for MstPengarang
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[MstPengarang]', RESEED, 4)
GO


-- ----------------------------
-- Primary Key structure for table MstPengarang
-- ----------------------------
ALTER TABLE [dbo].[MstPengarang] ADD CONSTRAINT [PK__MstPenga__40BAA0BFD10CAB21] PRIMARY KEY CLUSTERED ([IDPengarang])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for MstPenjualan
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[MstPenjualan]', RESEED, 1)
GO


-- ----------------------------
-- Uniques structure for table MstPenjualan
-- ----------------------------
ALTER TABLE [dbo].[MstPenjualan] ADD CONSTRAINT [UK_jc81fy1jh7lb13tch4fbxp502] UNIQUE NONCLUSTERED ([Struk] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table MstPenjualan
-- ----------------------------
ALTER TABLE [dbo].[MstPenjualan] ADD CONSTRAINT [PK__MstPenju__553A4A398E2CB968] PRIMARY KEY CLUSTERED ([IDPenjualan])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for MstPenjualanDetail
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[MstPenjualanDetail]', RESEED, 1)
GO


-- ----------------------------
-- Primary Key structure for table MstPenjualanDetail
-- ----------------------------
ALTER TABLE [dbo].[MstPenjualanDetail] ADD CONSTRAINT [PK__MstPenju__79AA0A40899F6C00] PRIMARY KEY CLUSTERED ([IDPenjualanDetail])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for MstUser
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[MstUser]', RESEED, 5)
GO


-- ----------------------------
-- Uniques structure for table MstUser
-- ----------------------------
ALTER TABLE [dbo].[MstUser] ADD CONSTRAINT [UK_dx4ibt97u8bouldmkfqqlscsg] UNIQUE NONCLUSTERED ([NoHP] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

ALTER TABLE [dbo].[MstUser] ADD CONSTRAINT [UK_oboap7j0f37yn6as1f4bdg8ge] UNIQUE NONCLUSTERED ([Email] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

ALTER TABLE [dbo].[MstUser] ADD CONSTRAINT [UK_sm88fnetmbdqh4l8x78oe73qv] UNIQUE NONCLUSTERED ([UserName] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table MstUser
-- ----------------------------
ALTER TABLE [dbo].[MstUser] ADD CONSTRAINT [PK__MstUser__EAE6D9DF8175312F] PRIMARY KEY CLUSTERED ([IDUser])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Foreign Keys structure for table MapAksesMenu
-- ----------------------------
ALTER TABLE [dbo].[MapAksesMenu] ADD CONSTRAINT [FKutfr2432txflhxixc2xot0cm] FOREIGN KEY ([IDMenu]) REFERENCES [dbo].[MstMenu] ([IDMenu]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[MapAksesMenu] ADD CONSTRAINT [FKia1giko3k3ge4a2kcikjxkpyg] FOREIGN KEY ([IDAkses]) REFERENCES [dbo].[MstAkses] ([IDAkses]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


-- ----------------------------
-- Foreign Keys structure for table MapPengarangBuku
-- ----------------------------
ALTER TABLE [dbo].[MapPengarangBuku] ADD CONSTRAINT [FKbl9f5isxc3ns8x9cvjuikwqev] FOREIGN KEY ([IDPengarang]) REFERENCES [dbo].[MstPengarang] ([IDPengarang]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[MapPengarangBuku] ADD CONSTRAINT [FKeppjlq71uodvpcm0gxgc4b1w0] FOREIGN KEY ([IDBuku]) REFERENCES [dbo].[MstBuku] ([IDBuku]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


-- ----------------------------
-- Foreign Keys structure for table MstAkses
-- ----------------------------
ALTER TABLE [dbo].[MstAkses] ADD CONSTRAINT [FKgxejoj2u42dx4cgikmx46n21u] FOREIGN KEY ([IDDivisi]) REFERENCES [dbo].[MstDivisi] ([IDDivisi]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


-- ----------------------------
-- Foreign Keys structure for table MstBuku
-- ----------------------------
ALTER TABLE [dbo].[MstBuku] ADD CONSTRAINT [FKgjxjeay8bg02krpkooamphwwq] FOREIGN KEY ([IDKategoriBuku]) REFERENCES [dbo].[MstKategoriBuku] ([IDKategoriBuku]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


-- ----------------------------
-- Foreign Keys structure for table MstMenu
-- ----------------------------
ALTER TABLE [dbo].[MstMenu] ADD CONSTRAINT [FKj5kkux3pyvhfpewo2v2f5ei83] FOREIGN KEY ([IDMenuHeader]) REFERENCES [dbo].[MstMenuHeader] ([IDMenuHeader]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


-- ----------------------------
-- Foreign Keys structure for table MstPenjualanDetail
-- ----------------------------
ALTER TABLE [dbo].[MstPenjualanDetail] ADD CONSTRAINT [FK4egllw6dxg9q6e9k4cjor9853] FOREIGN KEY ([IDItem]) REFERENCES [dbo].[MstItem] ([IDItem]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


-- ----------------------------
-- Foreign Keys structure for table MstUser
-- ----------------------------
ALTER TABLE [dbo].[MstUser] ADD CONSTRAINT [FKcciji28beqoqu0c84msjgwa07] FOREIGN KEY ([IDAkses]) REFERENCES [dbo].[MstAkses] ([IDAkses]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

