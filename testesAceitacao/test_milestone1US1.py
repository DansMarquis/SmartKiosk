# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestMilestone1US1():
  def setup_method(self, method):
    self.driver = webdriver.Chrome(executable_path='/mnt/c/chromedriver.exe')
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_milestone1US1(self):
    self.driver.get("https://danielmarquesdm32.wixsite.com/insightscontent/")
    self.driver.find_element(By.ID, "comp-k2qivmd0input").send_keys("heineken@insights.pt")
    self.driver.find_element(By.ID, "comp-k2qivmckinput").send_keys("pass035")
    self.driver.find_element(By.ID, "comp-k2qivme3label").click()
    self.driver.find_element(By.ID, "comp-k2qmuieklabel").click()
    self.driver.find_element(By.ID, "comp-k2qqdsmcinputWrapper").click()
    self.driver.find_element(By.ID, "comp-k2qqdsmccalendarmonthweek50day5dayContent").click()
    self.driver.find_element(By.ID, "comp-k2qsqb3binputWrapper").click()
    self.driver.find_element(By.ID, "comp-k2qsqb3bcalendarmonthweek51day5dayContent").click()
    self.driver.find_element(By.ID, "comp-k2qpygvuinput").send_keys("Banner")
    self.driver.find_element(By.ID, "comp-k2qqhe78input").send_keys("geral@heineken.pt")
    self.driver.find_element(By.ID, "comp-k2qqesarinput").send_keys("Heineken")
    self.driver.find_element(By.ID, "comp-k2qqi6tkinput").send_keys("+351123456789")
    self.driver.find_element(By.ID, "comp-k2qqibdbinput").send_keys("Rua de Lisboa, Almada")
    self.driver.find_element(By.ID, "comp-k2qqiq9nradio0container").click()
    self.driver.find_element(By.ID, "comp-k2qqigtxinput").send_keys("http://www.heineken.com/pt/~/resources/heineken/shared/wallpapers/heineken-wallpapers_26740_1280x800.jpg")
    self.driver.find_element(By.ID, "comp-k2qpygyplabel").click()
    self.driver.find_element(By.ID, "comp-k2qmux9zlabel").click()
  
