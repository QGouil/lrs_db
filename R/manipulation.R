#' Tidy software table
#'
#' Convert the software table to tidy format
#'
#' @param swsheet Tibble containing software table
#'
#' @return Tidy swsheet tibble
tidy_swsheet_tech <- function(swsheet) {
  
  `%>%` <- magrittr::`%>%`
  
  futile.logger::flog.info("Tidying data for technologies...")
  
  tidyr::gather(swsheet, key = 'Technology', value = 'Val',
                ONT,	PacBio,	tenX_Genomics,	
                All_Long_Reads,	Illumina,	BioNano_Genomics,	HiC) %>%
    dplyr::filter(Val == TRUE) %>%
    dplyr::select(-Val) %>%
    dplyr::arrange(Name)
}

#' Add technologies in focus
#'
#' Add technologies column to software table
#'
#' @param swsheet Tibble containing software table
#' @param tidysw_tech Tibble containing tidy software table based on technology
#'
#' @return swsheet with additional techs column
add_techs <- function(swsheet, tidysw_tech) {
  
  futile.logger::flog.info("Adding technologies in focus to table...")
  
  techlist <- split(tidysw_tech$Technology, f = tidysw_tech$Name)
  
  techdf <- data.frame(Name = names(techlist), stringsAsFactors = FALSE)
  techdf[["Technologies"]] <- techlist
  
  swsheet <- dplyr::left_join(swsheet, techdf, by = "Name")
}

#' Tidy software table
#'
#' Convert the software table to tidy format
#'
#' @param swsheet Tibble containing software table
#'
#' @return Tidy swsheet tibble
tidy_swsheet_cat <- function(swsheet) {

    `%>%` <- magrittr::`%>%`

    futile.logger::flog.info("Tidying data for categories...")

    tidyr::gather(swsheet, key = 'Category', value = 'Val',
                  BaseCalling, LongReadOverlapping, DenovoAssembly,Alignment,
                  GeneratingConsensusSequence,ErrorCorrectionandPolishing,EvaluatingExisitingMethods,
                  IsoformDetection,	MethylationDetection,	QualityChecking,SNPandVariantAnalysis,
                  Visualisation,	ReadQuantification,	SuitableforSinglecellExperiments,
                  TestedonHumanData,TestedonNonHumanData,Normalisation,ProvideSummaryStatistics,
                  QualityTrimming,AvailablityofTestData,GeneExpressionAnalysis,GapFilling,AnalysisPipelines) %>%
        dplyr::filter(Val == TRUE) %>%
        dplyr::select(-Val) %>%
        dplyr::arrange(Name)
}

#' Add categories
#'
#' Add categories column to software table
#'
#' @param swsheet Tibble containing software table
#' @param tidysw_cat Tibble containing tidy software table bsed on category
#'
#' @return swsheet with additional categories column
add_cats <- function(swsheet, tidysw_cat) {

    futile.logger::flog.info("Adding categories to table...")

    catlist <- split(tidysw_cat$Category, f = tidysw_cat$Name)

    catdf <- data.frame(Name = names(catlist), stringsAsFactors = FALSE)
    catdf[["Categories"]] <- catlist

    swsheet <- dplyr::left_join(swsheet, catdf, by = "Name")
}